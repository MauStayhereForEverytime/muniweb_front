import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // Cargar las variables de entorno con el prefijo VITE_ según el modo (development, production, etc.)
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    base: '/',
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_URL, // Usar la variable de entorno VITE_API_URL
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''), // Reescribe sin el prefijo /api si es necesario
          secure: false,
        },
      },
    },
  }
})
