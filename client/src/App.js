import React, { useState } from "react";
import "normalize.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from "styled-components";

import UsernameForm from "./components/UsernameForm";
import Room from "./components/Room";
import NotFound from "./components/NotFound";

const App = props => {
  const { className } = props;
  const [username, setUsername] = useState("");
  const [roomToRemember, setRoomToRemember] = useState("");
  return (
    <div className={className}>
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <UsernameForm
                {...props}
                roomToRemember={roomToRemember}
                setUsername={setUsername}
              />
            )}
            setUsername={setUsername}
          />
          <Route
            exact
            path="/room/:room_id"
            render={props => (
              <Room
                {...props}
                username={username}
                setRoomToRemember={setRoomToRemember}
              />
            )}
            username={username}
          />
          <Route exact path="*" component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
};

const StyledApp = styled(App)`
  font-family: sans-serif;
`;

export default StyledApp;
