const express = require("express");
const io = require("socket.io")(443);

const app = express();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
