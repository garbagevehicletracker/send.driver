import { io } from 'socket.io-client';

const socket = io('https://production-backend-3olq.onrender.com', {
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "abcd"
  }
});

export default socket;
