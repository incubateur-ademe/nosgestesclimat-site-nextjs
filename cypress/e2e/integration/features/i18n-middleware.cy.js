describe('i18nMiddleware - E2E Tests', () => {
  beforeEach(() => {
    // Intercept requests to avoid 404 errors
    cy.on('uncaught:exception', (err) => {
      if (err.message.includes('NEXT_NOT_FOUND')) {
        return false
      }
    })
  })

  describe('Locale change via lang parameter', () => {
    it('should redirect to new locale', () => {
      cy.visit('/fr/simulateur/bilan?lang=en')

      // Verify that URL has been redirected
      cy.url().should('include', '/tutoriel')
      cy.url().should('not.include', 'lang=en')
    })

    it('should clean URL if locale is already correct', () => {
      cy.visit('/en/simulateur/bilan?lang=en')

      // Verify that lang parameter has been removed
      cy.url().should('not.include', 'lang=en')
      cy.url().should('include', '/en/simulateur/bilan')
    })
  })

  describe('Iframe handling', () => {
    it('should work with iframe parameter', () => {
      cy.visit('/fr/simulateur/bilan?iframe=true')

      // Verify that page loads without 404 error
      cy.get('body').should('exist')
      cy.url().should('include', 'iframe=true')
    })

    it('should handle iframes with lang parameter', () => {
      cy.visit('/fr/simulateur/bilan?iframe=true&lang=en')

      // Verify that page loads
      cy.get('body').should('exist')
      // Iframe parameter should prevent redirection
      cy.url().should('include', 'iframe=true')
    })

    it('should detect iframes via referer', () => {
      // Simulate request with referer containing iframe=true
      cy.visit('/fr/simulateur/bilan', {
        headers: {
          referer: 'https://example.com/page?iframe=true',
        },
      })

      cy.get('body').should('exist')
    })
  })

  describe('URL construction with locale', () => {
    it('should add locale if it does not exist in path', () => {
      cy.visit('/simulateur/bilan?lang=en')

      cy.url().should('include', '/en/simulateur/bilan')
      cy.url().should('not.include', 'lang=en')
    })

    it('should replace existing locale', () => {
      cy.visit('/fr/simulateur/bilan?lang=en')

      cy.url().should('include', '/en/simulateur/bilan')
      cy.url().should('not.include', '/fr/')
      cy.url().should('not.include', 'lang=en')
    })
  })

  describe('Cookie handling', () => {
    it('should set locale cookie', () => {
      cy.visit('/fr/simulateur/bilan?lang=en')

      // Verify that cookie has been set
      cy.getCookie('NEXT_LOCALE').should('have.property', 'value', 'en')
    })

    it('should preserve cookie during navigation', () => {
      cy.visit('/fr/simulateur/bilan?lang=en')

      // Navigate to another page
      cy.visit('/en/actions')

      // Verify that cookie is still present
      cy.getCookie('NEXT_LOCALE').should('have.property', 'value', 'en')
    })
  })

  describe('Error cases and edge cases', () => {
    it('should handle empty URLs', () => {
      cy.visit('/?lang=en')

      cy.url().should('include', '/en')
      cy.url().should('not.include', 'lang=en')
    })

    it('should handle multiple parameters', () => {
      cy.visit('/fr/simulateur/bilan?lang=en&other=param')

      cy.url().should('include', '/en/simulateur/bilan')
      cy.url().should('include', 'other=param')
      cy.url().should('not.include', 'lang=en')
    })
  })
})
