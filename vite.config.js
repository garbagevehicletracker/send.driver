// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/driver-login': {
        target: 'https://garbage-tracking-backend.onrender.com',
        changeOrigin: true,
        secure: false,
      },
      '/socket.io': {
        target: 'https://production-backend-3olq.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
