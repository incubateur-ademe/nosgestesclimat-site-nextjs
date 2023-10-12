Cypress.on('window:before:load', (window) => {
  Object.defineProperty(window.navigator, 'language', { value: 'fr' })
})
