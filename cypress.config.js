import { addMatchImageSnapshotPlugin } from '@simonsmith/cypress-image-snapshot/plugin'
import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: 'bkkrae',
  viewportWidth: 1920,
  viewportHeight: 960,
  env: {
    // This is the URL of the local server that will be used for testing
    personas_fr_url: 'https://data.nosgestesclimat.fr/personas-fr.json',
    localisation_param: 'FR',
    language_param: 'fr',
    testLangURL: process.env.CYPRESS_testLangURL ?? 'en',
    personas_fr_url: 'https://data.nosgestesclimat.fr/personas-fr.json',
    localisation_param: 'FR',
    language_param: 'fr',
    testLangURL: process.env.CYPRESS_testLangURL ?? 'en',
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
