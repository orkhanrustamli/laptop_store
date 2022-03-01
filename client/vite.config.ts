import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true
    },
    hmr: {
      port: 3000,
      host: '0.0.0.0',
      clientPort: 8080,
      path: '/sockjs-node/'
    }
  }
})
