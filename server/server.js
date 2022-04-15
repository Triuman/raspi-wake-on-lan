const { Server } = require("socket.io");

const io = new Server({ cors: "*" });

let raspiSocket = null;

io.on("connection", (socket) => {
  console.log("new connection");

  socket.send({ isRaspiOnline: !!raspiSocket });

  socket.on("raspi", () => {
    console.log("raspi connected");
    raspiSocket = socket;
    io.emit("raspi", { isRaspiOnline: true });
  });

  socket.on("wakeup", (data) => {
    console.log("wake up is called");
    raspiSocket?.emit("wakeup", data);
  });
});

io.listen(3000);
console.log("server is running..");
