const path = require("path");
const htttp = require("http");
const express = require("express");
const sockitio = require("socket.io");
const Filter = require("bad-words");
const app = express();
const server = htttp.createServer(app);
const io = sockitio(server);
const { generateMessage, generateMessageLocation } = require("./utils/message");

const port = process.env.PORT || 5000;
const publicDirectoryPath = path.join(__dirname, "../public");

io.on("connection", (socket) => {
  console.log("webSockit is connected client side");

  socket.emit("message", generateMessage("Welcome!"));

  socket.broadcast.emit("message", generateMessage("A new user has joined!"));

  socket.on("sendMessage", (mesg, callback) => {
    const filter = new Filter();
    if (filter.isProfane(mesg)) {
      return callback("Profanity is not allowed");
    }
    io.emit("message", generateMessage(mesg));
    callback();
  });

  socket.on("sendLocation", (coords, callback) => {
    io.emit(
      "locationMessage",
      generateMessageLocation(`https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`)
    );
    callback();
  });

  socket.on("disconnect", () => {
    io.emit("message", generateMessage("A user has left!"));
  });
});

app.use(express.static(publicDirectoryPath));

server.listen(port, () => {
  console.log(`server is up on port ${port}!`);
});
