import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPath from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
    tsconfigPath(),
    svgr({
      svgrOptions: {
        icon: true,
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@share': path.resolve(__dirname, 'src/components/share'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@contexts': path.resolve(__dirname, 'src/contexts'),
      '@models': path.resolve(__dirname, 'src/models'),
      '@constants': path.resolve(__dirname, 'src/constants'),
      '@remote': path.resolve(__dirname, 'src/remote'),
      '@atoms': path.resolve(__dirname, 'src/atoms'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
    },
  },
});
