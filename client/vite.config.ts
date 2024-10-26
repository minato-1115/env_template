import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({mode})=>{
  return{
  plugins: [react()],
  base:mode ==="production"? "https://create-template-server-5510e22ac8f9.herokuapp.com/":"/"
  }
})
