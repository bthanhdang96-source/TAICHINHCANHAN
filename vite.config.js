import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api/sepay': {
        target: 'https://userapi.sepay.vn/v2',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/sepay/, '')
      }
    }
  },
  build: {
    outDir: 'dist',
  }
});
