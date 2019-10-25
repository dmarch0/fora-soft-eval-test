import React, { useEffect, useState } from "react";
import io from "socket.io-client";

import MessageFeed from "./MessageFeed";
import MessageForm from "./MessageForm";
import UsersList from "./UsersList";
import cfg from "../cfg";

//Chat component handles socket connection and incoming events
const Chat = props => {
  const { roomId, username } = props;
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentUsers, setCurrentUsers] = useState([]);
  const userId = socket ? socket.id : "";

  useEffect(() => {
    const newSocket = io.connect(`${cfg.baseURL}:443/${roomId}`, {
      query: { username }
    });

    newSocket.on("message", receiveMessage);
    newSocket.on("users", users => {
      setCurrentUsers(users);
    });

    setSocket(newSocket);
  }, [roomId]);

  const receiveMessage = message => {
    setMessages(messages => messages.concat(message));
    const messageFeed = document.getElementById("message-feed");
    messageFeed.scrollTop = messageFeed.scrollHeight;
  };

  const sendMessage = messageText => {
    socket.emit("message", {
      messageText,
      username,
      date: Date.now(),
      userId: socket.id
    });
  };
  return (
    <div>
      <MessageFeed messages={messages} userId={userId} />
      <MessageForm sendMessage={sendMessage} />
      <UsersList users={currentUsers} userId={userId} />
    </div>
  );
};

export default Chat;
