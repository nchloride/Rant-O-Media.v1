import { common } from "@material-ui/core/colors";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
let socket;

export default function ChatComponent({ userInformation, userToChat }) {
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);
  useEffect(() => {
    socket = io("http://localhost:5000");
    socket.on("connect", function () {
      userInformation &&
        socket.emit("online", {
          fullname: userInformation.fullname,
          username: userInformation.username,
        });
      socket.on(userInformation.username, (convoMessage) => {
        const { message, username, to } = convoMessage;
        setConversation((prevConvo) => [
          ...prevConvo,
          { message, username, to },
        ]);
      });
    });
  }, []);
  useEffect(() => {
    // setConversation(
    //   conversation.filter((convo) => convo.username !== userToChat)
    // );
  }, [userToChat]);
  const sendMessageHandler = () => {
    if (!userToChat) return;
    if (message === "") return;
    socket.emit(`message`, {
      message,
      username: userInformation.username,
      to: userToChat,
    });

    setConversation((prevConvo) => [
      ...prevConvo,
      { message: message, username: userInformation.username, to: userToChat },
    ]);
    setMessage("");
  };
  return (
    <div className="conversation-tab">
      <div className="conversation-tab--chat-display">
        {conversation
          ?.filter(
            (convo) => convo.to === userToChat || userToChat === convo.username
          )
          .map((convo, id) => (
            <div
              key={id}
              className={
                convo.username === userInformation.username
                  ? "sender"
                  : "receiver"
              }
            >
              <h1>{convo.message}</h1>
              <p>{convo.username}</p>
              <p>{convo.to}</p>
            </div>
          ))}
      </div>
      <div className="conversation-tab--chat-inputs">
        <input
          type="text"
          value={message}
          onChange={(value) => setMessage(value.target.value)}
        ></input>
        <button onClick={sendMessageHandler}>Send</button>
      </div>
    </div>
  );
}
