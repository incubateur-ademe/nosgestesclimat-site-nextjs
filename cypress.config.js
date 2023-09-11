import { defineConfig } from "cypress";

const testLangURL = process.env.CYPRESS_testLangURL ?? "en-US";

export default defineConfig({
  projectId: "bkkrae",
  env: {
    // This is the URL of the local server that will be used for testing
    personas_fr_url: "https://data.nosgestesclimat.fr/personas-fr.json",
    localisation_param: "FR",
    language_param: "fr",
  },
  e2e: {
    baseUrl: `${
      process.env.CYPRESS_baseUrl ?? "http://localhost:3000"
    }/${testLangURL}`,
    setupNodeEvents(on, config) {},
    experimentalRunAllSpecs: true,
    specPattern: "cypress/e2e/integration/**/*.cy.js",
  },
});
