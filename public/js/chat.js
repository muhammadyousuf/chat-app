const socket = io();

socket.on("countUpdater", count => {
  console.log("count has been updated!", count);
});

document.querySelector("#increment").addEventListener("click", () => {
  console.log("Clicked!!!");
  socket.emit("increment");
});
