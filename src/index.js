const path = require("path");
const htttp = require("http");
const express = require("express");
const sockitio = require("socket.io");

const app = express();
const server = htttp.createServer(app);
const io = sockitio(server);

const port = process.env.PORT || 5000;
const publicDirectoryPath = path.join(__dirname, "../public");

io.on("connection", (socket) => {
  console.log("webSockit is connected client side");

  socket.emit("message", "Welcome!");

  socket.broadcast.emit("message", "A new user has joined!");

  socket.on("sendMessage", (mesg) => {
    io.emit("message", mesg);
  });

  socket.on("sendLocation", (coords) => {
    io.emit("message", `https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`);
  });

  socket.on("disconnect", () => {
    io.emit("message", "A user has left!");
  });
});

app.use(express.static(publicDirectoryPath));

server.listen(port, () => {
  console.log(`server is up on port ${port}!`);
});
