import React from "react";

function ChatIconComponent({ user, setUserToChat }) {
  return (
    <div
      className="chat-box-chat-icon"
      onClick={() => setUserToChat(user.username)}
    >
      <p>{user.fullname}</p>
    </div>
  );
}

export default ChatIconComponent;
