import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Served from https://mones-cse.github.io/my-game-shelf/ in production
  base: process.env.NODE_ENV === 'production' ? '/my-game-shelf/' : '/',
  plugins: [react()],
})
