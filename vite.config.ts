import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, ''),
      '@src': resolve(__dirname, 'src/'),
      '@pages': resolve(__dirname, 'src/pages/'),
      '@core': resolve(__dirname, 'src/core/'),
      '@model': resolve(__dirname, 'src/core/model/'),
      '@utils': resolve(__dirname, 'src/core/utils/'),
      '@public': resolve(__dirname, 'public/'),
    }
  }
})
