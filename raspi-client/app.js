const wol = require("wol");
const { io } = require("socket.io-client");

const PC_MAC_ADDRESS = "44:85:00:91:BA:27";

var socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("connected");
  socket.emit("raspi");
});

socket.on("disconnect", () => {
  console.log("disconnected");
});

socket.on("wakeup", ({ macAddress }) => {
  console.log("got a wake up command!");
  wakeupThePC(macAddress || PC_MAC_ADDRESS);
});

function wakeupThePC(macAddress) {
  try {
    wol.wake(macAddress, (err, res) => {
      console.log(res);
    });
  } catch (error) {
    console.log("couldnt send wake up command.", error);
  }
}

socket.connect();
