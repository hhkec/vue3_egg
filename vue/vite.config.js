import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],

  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:7001',                //请求后台接口
        changeOrigin: true,                             // 允许跨域
        rewrite: (path) => path.replace(/^\/api/, '')   // 重写请求
      }
    }
 },

})

