import { defineConfig, devices } from '@playwright/test'
import dotenv from 'dotenv'
import { spawn } from 'child_process'
import { Client } from 'pg'

dotenv.config()

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests/e2e',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.PLAYWRIGHT_baseUrl ?? 'http://localhost:3000',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    /* Set locale */
    locale: 'fr-FR',
    /* Viewport size */
    viewport: { width: 1920, height: 960 },
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 10000,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: process.env.CI
    ? undefined
    : {
        command: 'npm run dev',
        url: 'http://localhost:3000',
        reuseExistingServer: true,
        timeout: 120 * 1000,
      },
})

// Helper function to get verification code from Scalingo database
export async function getVerificationCodeFromScalingo(): Promise<string | null> {
  let tunnelProcess = null
  try {
    // Set up SSH tunnel to Scalingo
    const scalingoApp = process.env.SCALINGO_APP_NAME
    const scalingoPostgresqlUrl = process.env.SCALINGO_POSTGRESQL_URL

    if (!scalingoApp || !scalingoPostgresqlUrl) {
      throw new Error(
        'Missing required environment variables: SCALINGO_APP_NAME or SCALINGO_POSTGRESQL_URL'
      )
    }

    // Use spawn instead of execSync to run the tunnel in background
    tunnelProcess = spawn(
      'scalingo',
      ['--app', scalingoApp, 'db-tunnel', scalingoPostgresqlUrl],
      {
        detached: true,
        stdio: ['ignore', 'pipe', 'pipe'],
      }
    )

    // Add event listeners to capture output and errors
    tunnelProcess.stdout.on('data', (data) => {
      console.log(`Tunnel stdout: ${data}`)
    })

    tunnelProcess.stderr.on('data', (data) => {
      console.error(`Tunnel stderr: ${data}`)
    })

    // Wait longer for the tunnel to establish
    console.log('Waiting for SSH tunnel to establish...')
    await new Promise((resolve) => setTimeout(resolve, 8000))
    console.log('SSH tunnel setup attempted')

    // Extract connection parameters from tunnelOutput if needed
    // For now using hardcoded values
    const client = new Client({
      host: 'localhost',
      port: 10000,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectionTimeoutMillis: 10000, // Add timeout
    })

    await client.connect()
    console.log('Database client connected')

    // Query to get the verification code
    const result = await client.query(
      `
        SELECT code FROM ngc."VerificationCode"
        WHERE email = '${process.env.VERIFICATION_CODE_EMAIL}'
        ORDER BY "createdAt" DESC
        LIMIT 1
        `
    )

    await client.end()
    console.log('Database connection closed')

    // Return the result
    if (result.rows.length > 0) {
      return result.rows[0].code
    } else {
      return null
    }
  } catch (error) {
    console.error('Error getting verification code:', error)
    throw error
  } finally {
    // Always clean up the tunnel process
    if (tunnelProcess && tunnelProcess.pid) {
      try {
        process.kill(-tunnelProcess.pid, 'SIGTERM')
        console.log('Tunnel process terminated')
      } catch (killError) {
        console.error('Error terminating tunnel process:', killError)
      }
    }
  }
}

