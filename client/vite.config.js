import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
dotenv.config();


// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      //  "/api/":"http://localhost:5000/"
      "/api/": process.env.SITE_URL
    }
  },
  plugins: [react()],
})
