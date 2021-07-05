const path = require("path");
const htttp = require("http");
const express = require("express");
const sockitio = require("socket.io");
const Filter = require("bad-words");
const app = express();
const server = htttp.createServer(app);
const io = sockitio(server);
const { generateMessage, generateMessageLocation } = require("./utils/message");
const { addUser, getUser, getUsersInRoom, removeUser } = require("./utils/users");
const port = process.env.PORT || 5000;
const publicDirectoryPath = path.join(__dirname, "../public");

io.on("connection", (socket) => {
  console.log("webSockit is connected client side");

  socket.on('join', (options, callback) => {
    const { error, user } = addUser({ "id": socket.id, ...options })
    if (error) {
      return callback(error)
    }
    socket.join(user.room);

    socket.emit("message", generateMessage("Welcome!"));

    socket.broadcast.to(user.room).emit("message", generateMessage(`${user.username} has joined!`));

    callback();
  })



  socket.on("sendMessage", (mesg, callback) => {
    const filter = new Filter();
    if (filter.isProfane(mesg)) {
      return callback("Profanity is not allowed");
    }
    io.to('test').emit("message", generateMessage(mesg));
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
    const user = removeUser(socket.id)
    if (user) {
      io.to(user.room).emit("message", generateMessage(`${} has left!`));
    }

  });
});

app.use(express.static(publicDirectoryPath));

server.listen(port, () => {
  console.log(`server is up on port ${port}!`);
});
