import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'

export default defineConfig({
  plugins: [
    react(),
    legacy({
      // Agregamos 'ie >= 11' para obligarlo a usar el formato ES5 sí o sí
      targets: ['ie >= 11', 'ios >= 9', 'safari >= 9'], 
      polyfills: true
    })
  ],
  build: {
    // Esto asegura que el código principal baje un cambio y no use sintaxis muy nueva
    target: 'es2015' 
  }
})