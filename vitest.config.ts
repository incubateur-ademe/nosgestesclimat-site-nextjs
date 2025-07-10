import react from '@vitejs/plugin-react'
import * as path from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  // @ts-expect-error - Conflict between vite and vitest versions
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/__mocks__/',
        '**/*.d.ts',
        '**/*.config.*',
        'cypress/',
        'public/',
        'src/app/globals.css',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    'process.env.NODE_ENV': '"test"',
  },
  assetsInclude: ['**/*.yaml'],
})
