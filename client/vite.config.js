import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        admin: 'index.html',
        inventory: 'inventory.html',
        billing: 'billing.html',
        ecommerce: 'ecommerce.html'
      }
    }
  }
})