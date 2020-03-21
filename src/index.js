const path = require("path");
const htttp = require("http");
const express = require("express");
const sockitio = require("socket.io");

const app = express();
const server = htttp.createServer(app);
const io = sockitio(server);

const port = process.env.PORT || 5000;
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

server.listen(port, () => {
  console.log(`server is up on port ${port}!`);
});
