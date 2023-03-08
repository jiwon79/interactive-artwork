import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, ''),
      '@src': resolve(__dirname, 'src/'),
      '@pages': resolve(__dirname, 'src/pages/'),
      '@model': resolve(__dirname, 'src/model/'),
      '@public': resolve(__dirname, 'public/'),
    }
  }
})
