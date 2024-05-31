import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/socket.io': {
        target: 'https://production-backend-3olq.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
