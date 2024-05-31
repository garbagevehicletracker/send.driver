import { io } from 'socket.io-client';

// Connect to the WebSocket server with CORS settings
const socket = io('https://production-backend-3olq.onrender.com', {
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "abcd"
  }
});

export default socket;
