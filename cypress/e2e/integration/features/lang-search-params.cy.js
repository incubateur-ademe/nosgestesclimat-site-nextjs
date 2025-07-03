import { NEXT_LOCALE_COOKIE_NAME } from '/src/i18nConfig'

describe('Paramètre lang dans l’URL', () => {
  it('redirige vers /en et met à jour le cookie quand ?lang=en', () => {
    cy.clearCookies()
    cy.visit('/?lang=en')
    cy.url().should('include', '/en')
    cy.url().should('not.include', 'lang=')
    cy.getCookie(NEXT_LOCALE_COOKIE_NAME).should('have.property', 'value', 'en')
    cy.contains('Take the test') // Vérifie que la page est bien en anglais
  })

  it('redirige vers /fr et met à jour le cookie quand ?lang=fr', () => {
    cy.clearCookies()
    cy.visit('/en?lang=fr')
    cy.url().should('not.include', '/en')
    cy.url().should('not.include', 'lang=')
    cy.getCookie(NEXT_LOCALE_COOKIE_NAME).should('have.property', 'value', 'fr')
    cy.contains('Passer le test') // Vérifie que la page est bien en français
  })

  it('redirige vers /es et met à jour le cookie quand ?lang=es', () => {
    cy.clearCookies()
    cy.visit('/?lang=es')
    cy.url().should('include', '/es')
    cy.url().should('not.include', 'lang=')
    cy.getCookie(NEXT_LOCALE_COOKIE_NAME).should('have.property', 'value', 'es')
    cy.contains('prueba')
  })

  it('ne redirige pas si la locale est déjà correcte, mais nettoie l’URL', () => {
    cy.clearCookies()
    cy.visit('/en?lang=en')
    cy.url().should('include', '/en')
    cy.url().should('not.include', 'lang=')
    cy.getCookie(NEXT_LOCALE_COOKIE_NAME).should('have.property', 'value', 'en')
  })

  it('ignore un paramètre lang invalide', () => {
    cy.clearCookies()
    cy.visit('/?lang=de')
    cy.url().should('not.include', '/de')
    cy.getCookie(NEXT_LOCALE_COOKIE_NAME).should('not.exist')
  })
})
