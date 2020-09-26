import React, { useContext, useState, useEffect } from "react";
import { User } from "../../../UserAuth";
import ChatIconComponent from "./chat-icon-component";
import io, { Socket } from "socket.io-client";
function ChatBoxComponent({ setUserToChat }) {
  const [onlineUsers, setOnlineUsers] = useState([]);
  useEffect(() => {
    let mounted = true;
    const socket = io("http://localhost:5000");
    socket.on("users", (users) => {
      console.log(users);
      mounted && setOnlineUsers(users);
    });
    return () => (mounted = false);
  }, []);
  const userInformation = useContext(User);

  return (
    <div className="chat-box-tab">
      <h1>Online Users</h1>
      {userInformation &&
        onlineUsers
          ?.filter((user) => user.username !== userInformation.username)
          .map((user, id) => (
            <ChatIconComponent
              key={id}
              user={user}
              setUserToChat={setUserToChat}
            />
          ))}
    </div>
  );
}

export default ChatBoxComponent;
