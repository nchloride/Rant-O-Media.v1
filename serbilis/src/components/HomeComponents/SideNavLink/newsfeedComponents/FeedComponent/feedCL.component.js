import React, { useState, useContext, useEffect } from "react";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import ChatOutlinedIcon from "@material-ui/icons/ChatOutlined";
import { CommentSection } from "./CommentSection.component";
import FeedComment from "./feedComment.component";
import Loader from "../../../../LoadingPage";
import { User } from "../../../../UserAuth";

const clickedStyle = {
  transition: "1s",
  color: "white",
};
const isLike = (postlikes, username) => {
  if (postlikes !== null) {
    postlikes = JSON.parse(postlikes);

    let liked = postlikes.filter((val) => val.username === username);
    return liked.length > 0 ? true : false;
  }
  return false;
};
const FeedCL = ({ comments, postID, postLikes, fullname }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const userInformation = useContext(User);
  const [like, setLike] = useState(
    isLike(postLikes, userInformation?.username)
  );
  const [postlikes, setPostLikes] = useState(JSON.parse(postLikes));
  const commentClicked = async () => {
    setCommentOpen(!commentOpen);
  };
  const likeCounter = (likes) => {
    let newCount = likes;
    if (likes !== null) {
      if (like === true) {
        newCount = newCount.filter(
          (val) => val.username !== userInformation?.username
        );
      } else {
        newCount.push({ fullname, username: userInformation?.username });
      }
      console.log("newcount:", newCount);
    } else {
      newCount = [{ fullname, username: userInformation?.username }];
    }
    setPostLikes(newCount);
  };
  const likeButtonClicked = async () => {
    likeCounter(postlikes);
    setLike(!like);
    await fetch("/postFeed/likePost", {
      mode: "cors",
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        postID,
        fullname,
        username: userInformation?.username,
      }),
    })
      .then((result) => result.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    return async () => {};
  }, []);
  return (
    <div className="feed-post-commentslikes">
      <div className="feed-post-commentslikes-counter">
        <p>{postlikes ? postlikes.length : 0}Likes </p>
        <p>{comments && comments.length}Comments</p>
      </div>
      <div className="feed-post-commentslikes-button">
        <button onClick={likeButtonClicked}>
          {like ? (
            <ThumbUpAltIcon></ThumbUpAltIcon>
          ) : (
            <ThumbUpOutlinedIcon></ThumbUpOutlinedIcon>
          )}
        </button>
        <button
          onClick={commentClicked}
          style={commentOpen ? clickedStyle : null}
        >
          <ChatOutlinedIcon></ChatOutlinedIcon>
        </button>
      </div>
      <div className="feed-post-commentslikes-panel"></div>
      {commentOpen && (
        <div className="main-comment-section">
          {comments &&
            comments.map((comment, id) => (
              <CommentSection comment={comment} key={id}></CommentSection>
            ))}
          <FeedComment userInfo={userInformation} postID={postID}></FeedComment>
        </div>
      )}
    </div>
  );
};
export default FeedCL;
