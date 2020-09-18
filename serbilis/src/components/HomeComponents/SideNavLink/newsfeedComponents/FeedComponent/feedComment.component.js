import React, { useContext } from "react";

import { User } from "../../../../UserAuth/";
import { CommentRefresher } from "../../../CommentRefresher/";
import { useForm } from "react-hook-form";
const FeedComment = ({ userInfo, postID }) => {
  const { handleSubmit, register, reset } = useForm();

  const userInformation = useContext(User);
  const [refresh, setRefresh] = useContext(CommentRefresher);

  const commentSubmit = async (data) => {
    await fetch("/postFeed/insertComment", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        postid: postID,
        username: userInformation?.fullname,
        comment: data.comment,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((result) => setRefresh(!refresh))
      .catch((err) => console.log(err));

    reset();
  };

  return (
    <div className="feed-post-commentbar">
      <form
        onSubmit={handleSubmit(commentSubmit)}
        className="feed-post-commentbar-form"
      >
        <input
          type="text"
          name="comment"
          placeholder="Write a comment "
          ref={register({ required: true, minLength: 10 })}
        ></input>
        <input type="submit"></input>
      </form>
    </div>
  );
};
export default FeedComment;
