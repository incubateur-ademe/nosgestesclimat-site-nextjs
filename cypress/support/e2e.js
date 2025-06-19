Cypress.on('test:before:run', () => {
  Cypress.automation('remote:debugger:protocol', {
    command: 'Emulation.setLocaleOverride',
    params: {
      locale: 'fr-FR',
    },
  })
})

// Désactiver les AB Tests globalement pour tous les tests Cypress
beforeEach(() => {
  // Définir une variable globale pour désactiver les AB Tests
  cy.window().then((win) => {
    win.Cypress = true
    console.log(
      '[Cypress] AB Testing disabled via window.disable_matomo_ab_test'
    )
  })
})
