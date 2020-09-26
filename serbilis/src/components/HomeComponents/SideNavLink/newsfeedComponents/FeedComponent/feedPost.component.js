import React, { useState, useContext, useEffect } from "react";
import FeedCL from "./feedCL.component";
import { CommentRefresher } from "../../../CommentRefresher";

const FeedPost = ({ post }) => {
  const [comments, setComments] = useState();
  const [refresh, setRefresh] = useContext(CommentRefresher);

  useEffect(() => {
    let mounted = true;
    const getComment = async () => {
      // const commment = await fetch("/postFeed/getComment", {
      //   mode: "cors",
      //   method: "post",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ postID: post.postID }),
      // });
      // const data = await commment.json();
      // setComments(data);
      await fetch("/postFeed/getComment", {
        mode: "cors",
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postID: post.postID }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (mounted) setComments(data);
        });
    };
    getComment();
    return () => (mounted = false);
  }, [!refresh]);
  return (
    <div className="feed-post">
      <p>{post.fullname}</p>
      <h1 className="feed-postMessage">{post.postMessage}</h1>
      <p>{post.postType}</p>
      <p className="feed-postDate">{post.postDate}</p>

      {comments && (
        <FeedCL
          comments={comments}
          postID={post.postID}
          postLikes={post.postLikes}
          fullname={post.postUsername}
        ></FeedCL>
      )}
    </div>
  );
};
export default React.memo(FeedPost);
