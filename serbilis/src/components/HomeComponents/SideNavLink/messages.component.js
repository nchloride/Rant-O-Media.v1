import React, { useContext, useState } from "react";
import { User } from "../../UserAuth";
import ChatComponent from "./messagesComponent/chat-component";
import "../../../styles/messages.css";
import ChatBoxComponent from "./messagesComponent/chat-box-component";
function MessageComponent() {
  const userInformation = useContext(User);
  const [userToChat, setUserToChat] = useState();
  return (
    <div className="messages-tab">
      <div>
        {userToChat && <h1>{userToChat}</h1>}
        <ChatComponent
          userInformation={userInformation}
          userToChat={userToChat}
        />
      </div>
      <ChatBoxComponent setUserToChat={setUserToChat} />
    </div>
  );
}

export default MessageComponent;
