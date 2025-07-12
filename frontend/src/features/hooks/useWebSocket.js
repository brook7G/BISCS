import { useState, useEffect } from "react";

export const useWebSocket = (studentId) => {
  const url = "wss://localhost:5000/";
  const [ws, setWs] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const handleClose = () => {
    console.log("Sorry, I am disconnected");
    const delay = Math.min(1000 * 2 ** retryCount, 30000);
    setTimeout(() => {
      reconnect();
      setRetryCount((count) => count + 1);
    }, delay);
  };

  const handleOpen = () => {
    console.log("Hello, I am connected");
    ws.send(JSON.stringify({ id: studentId }));
    setRetryCount(0);
  };

  const reconnect = () => {
    if (ws) {
      ws.close();
    }
    setWs(new WebSocket(url));
  };

  useEffect(() => {
    setWs(new WebSocket(url));
  }, [url]);

  useEffect(() => {
    if (ws) {
      ws.addEventListener("close", handleClose);
      ws.addEventListener("open", handleOpen);
      return () => {
        ws.removeEventListener("close", handleClose);
        ws.removeEventListener("open", handleOpen);
        ws.close();
      };
    }
  }, [ws]);

  return ws;
};
