import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Moment from "react-moment";

//Handles rendering a single message
const MessageItem = props => {
  const { username, date, messageText } = props.message;
  const { className } = props;
  const parsedDate = new Date(parseInt(date));

  const [mounted, mount] = useState(false);
  useEffect(() => {
    setTimeout(() => mount(true), 0);
  }, []);

  return (
    <div className={mounted ? className + " mounted" : className}>
      <div className="message-header">
        <div>{username}</div>
        <div>
          <Moment format="HH:mm">{parsedDate}</Moment>
        </div>
      </div>
      <div className="message-content">{messageText}</div>
    </div>
  );
};

const StyledMessageItem = styled(MessageItem)`
  background-color: ${props => (props.active ? "#98fb98" : "#fff")};
  align-self: ${props => (props.active ? "flex-end" : "flex-start")};
  margin: 5px;
  border-radius: 5px;
  width: 60%;
  padding: 5px;
  box-shadow: 10px 10px 5px -10px rgba(0, 0, 0, 0.75);
  transform: ${props => {
    return props.active ? "translate(50px, 0px)" : "translate(-50px, 0px)";
  }};
  opacity: 0;
  transition: 0.2s ease-in all;

  &.mounted {
    transform: translate(0px, 0px);
    opacity: 1;
  }

  .message-header {
    display: flex;
    font-style: italic;

    div {
      width: 50%;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;

      time {
        width: 100%;
        text-align: right;
        display: block;
      }
    }
  }

  .message-content {
    width: 100%;
    word-wrap: break-word;
  }
`;

export default StyledMessageItem;
