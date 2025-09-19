const express = require("express");
const http = require("http");
const path = require("path");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const clients = new Set();

wss.on("connection", (ws) => {
  console.log("Client connected");
  clients.add(ws);

  ws.on("close", () => {
    console.log("Client disconnected");
    clients.delete(ws);
  });

  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
  });
});

app.use(express.json());
app.use(express.static(path.join(__dirname, "dist")));

app.get("/", (req, res) => {
  res.json({ message: "Hello from the server!" });
});

app.post("/api/notifications", (req, res) => {
  const notification = {
    id: Date.now(),
    message: `Random notification #${Math.floor(Math.random() * 1000)}`,
    timestamp: new Date().toISOString(),
    type: ["info", "warning", "success", "error"][Math.floor(Math.random() * 4)],
  };

  // Отправляем уведомление
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(notification));
    }
  });

  res.json({ success: true, notification });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
