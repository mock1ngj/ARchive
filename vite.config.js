import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteBasicSslPlugin from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteBasicSslPlugin()],
  build: {
    target: 'esnext' //browsers can handle the latest ES features
  }
})