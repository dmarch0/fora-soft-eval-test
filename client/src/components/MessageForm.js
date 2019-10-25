import React, { useState } from "react";
import styled from "styled-components";

//Message form component handles sending messages
const MessageForm = props => {
  const { sendMessage, className } = props;
  const [messageText, setMessageText] = useState("");

  const handleChange = event => {
    setMessageText(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    sendMessage(messageText);
    setMessageText("");
  };

  const handleKeyUp = event => {
    event.preventDefault();
    if (event.keyCode === 13 && !event.ctrlKey) {
      handleSubmit(event);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <label htmlFor="message">Enter a message: </label>
      <textarea
        type="text"
        name="message"
        value={messageText}
        id="message"
        onChange={handleChange}
        maxLength="200"
        onKeyUp={handleKeyUp}
      />
      <button>send</button>
    </form>
  );
};

const StyledMessageForm = styled(MessageForm)`
  height: 200px;
  margin: 10px;
  width: 100%;
  label {
    height: 20px;
    margin-bottom: 5px;
  }
  textarea {
    height: 100px;
    width: 400px;
    display: block;
    resize: none;
  }
  button {
    margin-top: 5px;
    display: block;
  }
`;

export default StyledMessageForm;
