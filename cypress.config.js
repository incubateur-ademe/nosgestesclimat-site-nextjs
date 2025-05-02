import { addMatchImageSnapshotPlugin } from '@simonsmith/cypress-image-snapshot/plugin'
import { spawn } from 'child_process'
import { defineConfig } from 'cypress'
import dotenv from 'dotenv'
import { Client } from 'pg'

dotenv.config()

export default defineConfig({
  projectId: 'bkkrae',
  viewportWidth: 1920,
  viewportHeight: 960,
  defaultCommandTimeout: 10000,
  env: {
    localisation_param: 'FR',
    language_param: 'fr',
    testLangURL: process.env.CYPRESS_testLangURL ?? 'fr',
    server_url: process.env.CYPRESS_baseUrl
      ? 'nosgestesclimat.osc-fr1.scalingo.io'
      : 'localhost:3001',
    ...process.env,
  },
  e2e: {
    baseUrl: process.env.CYPRESS_baseUrl ?? 'http://localhost:3000',
    setupNodeEvents(on) {
      addMatchImageSnapshotPlugin(on)
      on('task', {
        getVerificationCodeFromScalingo: async () => {
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
            return `Error: ${error.message}`
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
        },
        log(message) {
          console.log(message)
          return ''
        },
      })
    },
    experimentalRunAllSpecs: true,
    specPattern: 'cypress/e2e/**/*.cy.js',
  },
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
})
