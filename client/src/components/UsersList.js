import React from "react";
import styled from "styled-components";

//Handes displaying list of currently connected users
const UsersList = props => {
  const { users, className, userId } = props;
  return (
    <ul className={className}>
      {users.map(user => (
        <li
          className={user.userId === userId ? "active" : null}
          key={user.userId}
        >
          {user.username}
        </li>
      ))}
    </ul>
  );
};

const StyledUsersList = styled(UsersList)`
  position: fixed;
  top: 0px;
  right: 0px;
  list-style-type: none;
  padding: 5px;
  margin: 0;
  width: 200px;

  li {
    width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding: 2px;
    box-shadow: 10px 10px 5px -10px rgba(0, 0, 0, 0.75);
    border-radius: 3px;

    &.active {
      background-color: #98fb98;
    }
  }
`;

export default StyledUsersList;
