import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    strictPort: true,
    // In dev, /api => Express (5000). The browser sees same-origin, so no cookie/CORS issues.
    proxy: { '/api': { target: 'http://localhost:5000', changeOrigin: true } },
  },
})
