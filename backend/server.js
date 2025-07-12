const express = require("express");
const connectDB = require("./config/dbConfig");
const WebSocket = require("ws");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const events = require("events");
global.eventEmitter = new events.EventEmitter();

const wss = new WebSocket.Server({ noServer: true });
dotenv.config();
const port = process.env.PORT ||   5000;
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use("/api/clearanceType", require("./routes/clearanceRoutes"));
app.use("/api/Student", require("./routes/studentsRoutes"));
app.use("/api/StudentsClearance", require("./routes/studentsClearanceRoutes"));
app.use("/api/loan", require("./routes/loanRoutes"));
app.use("/api/user", require("./routes/userRoutes"));

const server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);

let clients = new Map();

server.on("upgrade", (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit("connection", ws, request);

    ws.on("message", (message) => {
      const data = JSON.parse(message);
      if (data.id) {
        clients.set(ws, data.id);
      }
    });

    ws.on("close", () => {
      clients.delete(ws);
    });
  });
});

global.eventEmitter.on("sendToClients", (StudentId, message) => {
  let ws = null;
  clients.forEach((id, client) => {
    if (id === StudentId) {
      ws = client;
    }
  });

  if (ws) {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(message));
    }
  }
});
