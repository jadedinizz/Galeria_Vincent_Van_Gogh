import { defineConfig } from 'vite';

const target = process.env.API_PROXY_TARGET || 'http://127.0.0.1:8001';
const proxy = { target, changeOrigin: true };

export default defineConfig({
  server: {
    proxy: {
      '/api': proxy,
      '/media': proxy,
    },
  },
});
