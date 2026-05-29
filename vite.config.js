import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    legacy({
      // Podés ajustar la versión de iOS dependiendo de la que tenga tu iPad Mini
      targets: ['iOS >= 9', 'Safari >= 9'], 
      polyfills: true
    })
  ],
})