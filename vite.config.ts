import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, ''),
      '@src': resolve(__dirname, 'src/'),
      '@pages': resolve(__dirname, 'src/pages/'),
      '@core': resolve(__dirname, 'src/core/'),
      '@element': resolve(__dirname, 'src/core/element/'),
      '@utils': resolve(__dirname, 'src/core/utils/'),
      '@public': resolve(__dirname, 'public/'),
    },
  },
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: `
  //         @import "@src/SolidTextPage.module.scss";
  //       `
  //     }
  //   }
  // }
});
