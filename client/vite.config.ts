import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base:process.env.VITE_APP_ENV ==="production"? "https://create-template-server-5510e22ac8f9.herokuapp.com/":"/"
})
