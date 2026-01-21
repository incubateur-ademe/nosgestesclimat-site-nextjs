import { defineConfig, devices } from '@playwright/test'
import dotenv from 'dotenv'
import { NEW_VISITOR_STATE } from './e2e/state'
import { FixturesOptions } from './e2e/fixtures/options'

dotenv.config({quiet: true})


/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig<FixturesOptions>({
  testDir: './e2e',
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  use: {
    baseURL: process.env.PLAYWRIGHT_baseUrl ?? 'http://localhost:3000',
    trace: 'on-first-retry',
    locale: 'fr-FR',
  },
  expect: {
    timeout: 10_000,
  },


  /* Configure projects for major browsers */
  projects: [
    {
      name: 'global setup',
      testMatch: /global\.setup\.ts/,
      workers: 3,
      use: {
        setup: true, // Custom option passed to fixtures (to launch them in setup mode)
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'chromium',
      dependencies: ['global setup'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: NEW_VISITOR_STATE,
      },
    },
    ...(process.env.CI ? [
      {
        name: 'firefox',
        dependencies: ['global setup'],
        use: {
          ...devices['Desktop Firefox'],
          storageState: NEW_VISITOR_STATE,
        },
      },
      {
        name: 'iPhone',
        dependencies: ['global setup'],
        use: {
          ...devices['iPhone 11 Pro'],
          storageState: NEW_VISITOR_STATE,
        },
      },
    ] : []),
  ],

  /* Run your local dev server before starting the tests */
  webServer: process.env.CI
    ? undefined
    : {
        command: 'npm run dev',
        url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
        reuseExistingServer: !process.env.CI,
        timeout: 120 * 1000,
        // env: process.env as Record<string, string>,
      },
})
