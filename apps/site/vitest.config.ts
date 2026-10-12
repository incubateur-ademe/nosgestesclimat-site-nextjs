import react from '@vitejs/plugin-react'
import * as path from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    env: {
      NEXT_PUBLIC_SITE_URL: 'http://localhost:3000',
      SESSION_ENCRYPTION_KEY: 'fake-test-key-256bit-not-a-secret',
      BREVO_URL: 'https://api.brevo.test',
      BREVO_API_KEY: 'fake-test-brevo-api-key',
      REDIS_URL: 'redis://localhost:6379',
      // Tests exercise the failure paths: `error` keeps them — and the capture
      // they assert — while silencing the lines they do not look at. A level the
      // app accepts, since `env/public.ts` validates the variable.
      NEXT_PUBLIC_LOG_LEVEL: 'error',
    },
    css: true,
    exclude: ['**/node_modules/**', '**/e2e/**', '**/.next/**'],
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
      // Marker package that throws outside Next's `react-server` condition.
      'server-only': path.resolve(__dirname, './vitest.empty-module.ts'),
    },
  },
  define: {
    'process.env.NODE_ENV': '"test"',
  },
  assetsInclude: ['**/*.yaml'],
})
