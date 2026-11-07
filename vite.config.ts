import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { copyFile } from 'node:fs/promises';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'github-pages-spa-fallback',
      apply: 'build',
      closeBundle: async () => {
        await copyFile(
          new URL('./dist/index.html', import.meta.url),
          new URL('./dist/404.html', import.meta.url),
        );
      },
    },
  ],
  base: '/toyandjoy7/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
