import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    strictPort: true,
    // Dev mein /api => Express (5000). Browser ko same-origin dikhta hai, to cookie/CORS issues nahi.
    proxy: { '/api': { target: 'http://localhost:5000', changeOrigin: true } },
  },
})
