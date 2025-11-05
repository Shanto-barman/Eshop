import { defineConfig } from 'vite'
import react from '@preact/preset-vite'
import tailwindcss from '@tailwindcss/vite'
import path from "path"
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
   resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
