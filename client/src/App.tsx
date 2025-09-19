import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useEffect, useRef, useState } from "react";

interface Notification {
  id: number;
  message: string;
  timestamp: string;
  type: string;
}

function App() {
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:3001");

    ws.current.onopen = () => {
      console.log("WebSocket connection opened");
    };

    ws.current.onmessage = (event) => {
      try {
        const notification: Notification = JSON.parse(event.data);
        setNotifications((prev) => [notification, ...prev]);
      } catch (error) {
        console.error("Error parsing notification:", error);
      }
    };

    ws.current.onerror = (error) => {
      console.log("WebSocket connection error", error);
    };

    ws.current.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      ws.current?.close();
    };
  }, []);

  const [notifications, setNotifications] = useState<Notification[]>([]);

  const handleClearNotificationsCount = () => {
    setNotifications([]);
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={handleClearNotificationsCount}>Notifications {notifications.length}</button>
        <p>
          Send POST request to <code>http://localhost:3001</code> to create random notification
        </p>
      </div>

      <div className="notifications">
        {notifications.length === 0 ? (
          <p className="read-the-docs">Notifications not found</p>
        ) : (
          <div className="notification-list">
            {notifications.map((notification) => (
              <div key={notification.id} className={`notification ${notification.type}`}>
                <p>{notification.message}</p>
                <small>{new Date(notification.timestamp).toLocaleTimeString()}</small>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
