//importing modules
const uniqid = require("uniqid");
const express = require("express");
const io = require("socket.io")(443);
const cors = require("cors");
const path = require("path");
const RoomManager = require("./management");

const app = express();

//applying cors middleware
app.use(
  cors({
    origin: "http://217.160.65.114:80",
    credentials: true
  })
);

//applying static resources middleware

app.use(express.static(path.join(__dirname, "client", "build")));

const manager = new RoomManager();

//@route GET /new
//@desc handling creation of new socket.io namespace
//@access public
app.get("/new", (req, res) => {
  const id = uniqid();
  const room = io.of(`/${id}`);
  manager.registerRoom(id);
  room.on("connection", socket => {
    //On user connection emit current connected users
    const currentUsers = manager.connectUser(
      id,
      socket.id,
      socket.handshake.query.username
    );
    console.log(`${socket.id} connected to ${id}`);
    room.emit("users", currentUsers);

    //On user disconnection emit current connected users
    socket.on("disconnect", () => {
      console.log(`${socket.id} left from ${id}`);
      const usersLeft = manager.disconnectUser(id, socket.id);
      //If no users left, clean socket.io namespace
      if (usersLeft) {
        room.emit("users", usersLeft);
      } else {
        room.removeAllListeners();
        delete io.nsps[`/${id}`];
      }
    });

    //On message emit message
    socket.on("message", message => {
      room.emit("message", message);
    });
  });

  //Return id of newly created namespace
  return res.json({ success: true, id });
});

//@route GET /check
//@desc checking if namespace exists
//@access public
app.get("/check", (req, res) => {
  //if namespace exists, return true, else return false
  const room = manager.getRoom(req.query.room_id);
  if (room) {
    return res.json({ success: true });
  } else {
    return res.json({ success: false });
  }
});

const buildPath = path.join(__dirname, "client", "build", "index.html");
//@route GET /*
//@desc sending public html file
//@access public
app.get("/*", (req, res) => {
  return res.sendFile(buildPath);
});

//initialize app
const port = process.env.PORT || 80;
app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
