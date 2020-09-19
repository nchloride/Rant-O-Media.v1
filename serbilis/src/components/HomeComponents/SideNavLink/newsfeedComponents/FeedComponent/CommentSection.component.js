import React, { useContext, useState } from "react";
import PersonIcon from "@material-ui/icons/Person";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { User } from "../../../../UserAuth";
import { CommentRefresher } from "../../../CommentRefresher";
import Modal from "react-modal";
const modalStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    height: "20px",
    width: "500px",
    overflow: "none",
    backgroundColor: "#3b3b3b",
    color: "white",
    padding: "20px",
  },
};
Modal.setAppElement("body");
export const CommentSection = ({ comment }) => {
  const userInformation = useContext(User);
  const [modalOpen, setModalOpen] = useState(false);
  const [refresh, setRefresh] = useContext(CommentRefresher);

  const deleteCommentHandler = async () => {
    await fetch("/postFeed/deleteComment", {
      mode: "cors",
      method: "post",
      body: JSON.stringify({
        commentID: comment.commentID,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((data) => data.json())
      .then((res) => {
        console.log(res);
        setRefresh(!refresh);
        setModalOpen(false);
      });
  };
  return (
    <div className="comment-section">
      <div className="comment-details">
        <div className="comment-section-user">
          <PersonIcon />
          <p>{comment.username}</p>
        </div>
        <span className="comment-section-comment">{comment.comment}</span>
      </div>

      {userInformation.username === comment.commentUsernameID && (
        <button onClick={() => setModalOpen(true)}>
          <DeleteForeverIcon />
        </button>
      )}
      <Modal isOpen={modalOpen} style={modalStyle}>
        <p>Are you sure you want to delete this comment? </p>
        <button onClick={deleteCommentHandler}>Yes</button>
        <button onClick={() => setModalOpen(false)}>No</button>
      </Modal>
    </div>
  );
};
