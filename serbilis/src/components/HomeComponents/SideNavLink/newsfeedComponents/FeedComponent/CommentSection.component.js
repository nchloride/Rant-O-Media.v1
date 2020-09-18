import React from "react";
import PersonIcon from "@material-ui/icons/Person";
export const CommentSection = ({ comment }) => {
  return (
    <div className="comment-section">
      <div className="comment-section-user">
        <PersonIcon />
        <p>{comment.username}</p>
      </div>

      <span className="comment-section-comment">{comment.comment}</span>
    </div>
  );
};
