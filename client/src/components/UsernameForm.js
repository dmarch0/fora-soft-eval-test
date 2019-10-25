import React, { useState } from "react";
import styled from "styled-components";

//Handles user entering a username
const UsernameForm = props => {
  const { className, setUsername, history, roomToRemember } = props;
  const [formValue, setFormValue] = useState("");

  const handleSubmit = event => {
    event.preventDefault();
    setUsername(formValue);
    history.push(`/room/${roomToRemember || "new"}`);
  };

  const handleChange = event => {
    setFormValue(event.target.value);
  };

  return (
    <form className={className} onSubmit={handleSubmit}>
      <label>Enter a username</label>
      <input
        type="text"
        name="username"
        id="username"
        onChange={handleChange}
        value={formValue}
      />
      <button>submit</button>
    </form>
  );
};

const StyledUsernameForm = styled(UsernameForm)`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default StyledUsernameForm;
