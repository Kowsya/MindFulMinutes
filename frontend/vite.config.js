import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// base './' lets the built site work from any sub-path (e.g. GitHub Pages /repo-name/).
export default defineConfig({
  base: './',
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.js',
    css: false,
  },
})
