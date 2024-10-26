import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({mode})=>{
  const isProduction = mode === "production"
  return {
    root:isProduction ? "client" : ".",
    plugins: [react()]
  }
})
