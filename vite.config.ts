import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), tailwindcss()],

    css: {
      modules: {
        localsConvention: 'camelCase',
      },
    },

    assetsInclude: ['**/*.svg?react'],

    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@components': path.resolve(__dirname, './src/components'),
        '@store': path.resolve(__dirname, './src/store'),
        '@features': path.resolve(__dirname, './src/features'),
      },
    },
    server: {
      proxy: {
        [env.VITE_BACKEND_ENDPOINT]: {
          target: env.VITE_BACKEND, // ваш реальный backend URL
          changeOrigin: true,
          secure: false, // для http
          rewrite: (path) => path.replace(new RegExp(`^\\${env.VITE_BACKEND_ENDPOINT}`), ''),
        },
      },
    },
  }
})

// export default defineConfig()
