import { addMatchImageSnapshotPlugin } from '@simonsmith/cypress-image-snapshot/plugin'
import { defineConfig } from 'cypress'
import dotenv from 'dotenv'

dotenv.config()

export default defineConfig({
  projectId: 'bkkrae',
  viewportWidth: 1920,
  viewportHeight: 960,
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
