import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  root:"client",
  plugins: [react()],
  build: {
    rollupOptions: {
      input: 'client/index.html',  // 明示的にindex.htmlへのパスを指定
    },
  },
})
