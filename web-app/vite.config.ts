import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import Checker from 'vite-plugin-checker';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig(() => ({
  base: '/',

  plugins: [react(), svgr(), Checker({ typescript: true })],

  // for dev
  server: {
    port: 4000,
    strictPort: true,
    // TODO: Causing issue while loading assets using alias
    // origin: 'http://0.0.0.0:4000',
    proxy: {
      '/api': 'http://localhost:8000',
    },
  },

  //change port for production
  preview: {
    port: 4001,
    strictPort: true,
  },

  //paths for typescript
  resolve: {},

  build: {
    sourcemap: true,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: 'src/setupTests.js',
  },
}));
