const express = require("express");
const http = require("http");
const path = require("path");

const app = express();
const server = http.createServer(app);

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

  // Отправляем уведомление всем подключенным клиентам
  //   clients.forEach((client) => {
  //     if (client.readyState === WebSocket.OPEN) {
  //       client.send(JSON.stringify(notification));
  //     }
  //   });

  res.json({ success: true, notification });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
