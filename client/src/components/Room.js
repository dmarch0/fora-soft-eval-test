import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

import Chat from "./Chat";
import Spinner from "./Spinner";
import cfg from "../cfg";

//Room component acts as a redirect component handling cases of
//user not having entered a username or roomId being non-existent
const Room = props => {
  const { username, setRoomToRemember, match, history } = props;
  const { room_id } = match.params;
  const [loading, setLoading] = useState(true);

  //If no username, redirect to UsernameForm
  //Remember the roomId so user redirects back to it
  //Once he entered username
  if (!username) {
    setRoomToRemember(match.params.room_id);
  }

  useEffect(() => {
    if (room_id === "new") {
      //if creating new room
      //create new namespace on server
      //get newly created room's id
      //then redirect to newly created room
      (async () => {
        try {
          const result = await fetch(`${cfg.baseURL}:80/new`, {
            method: "GET",
            headers: {
              Origin: `${cfg.baseURL}:80`
            }
          });

          const json = await result.json();
          history.push(`/room/${json.id}`);
        } catch (error) {
          console.log(error);
        }
      })();
    } else {
      //check if room exists
      //if not, redirect to /
      //otherwise render Chat component
      (async () => {
        try {
          const result = await fetch(
            `${cfg.baseURL}:80/check?room_id=${room_id}`,
            {
              method: "GET"
            }
          );
          const json = await result.json();
          if (!json.success) {
            history.push("/");
            setRoomToRemember("");
          } else {
            setLoading(false);
          }
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [match.params.room_id]);

  //If username exists and room exists, render Chat
  //Otherwise redirect to /
  return (
    <>
      {username ? (
        loading ? (
          <Spinner />
        ) : (
          <Chat roomId={room_id} username={username} />
        )
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};

export default Room;
