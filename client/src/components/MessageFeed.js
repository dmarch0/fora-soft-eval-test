import React from "react";
import MessageItem from "./MessageItem";
import styled from "styled-components";

//Message feed component renders list of messages
const MessageFeed = props => {
  const { messages, className, userId } = props;
  return (
    <div className={className} id="message-feed">
      {messages.map((message, index) => (
        <MessageItem
          message={message}
          key={index}
          active={message.userId === userId}
        />
      ))}
    </div>
  );
};

const StyledMessageFeed = styled(MessageFeed)`
  width: 500px;
  height: calc(100vh - 200px);
  margin: 10px;
  box-shadow: 10px 10px 5px -10px rgba(0, 0, 0, 0.75);
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
`;

export default StyledMessageFeed;
