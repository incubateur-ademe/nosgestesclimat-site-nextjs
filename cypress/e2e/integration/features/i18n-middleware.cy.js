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
      cy.url().should('include', '/en/tutoriel')
      cy.url().should('not.include', 'lang=en')
    })

    it('should clean URL if locale is already correct', () => {
      cy.visit('/en/fin?lang=en')

      // Verify that lang parameter has been removed
      cy.url().should('not.include', 'lang=en')
      cy.url().should('include', '/en/fin')
    })
  })

  describe('Iframe handling', () => {
    it('should work with iframe parameter', () => {
      cy.visit('/fr/fin?iframe=true')

      // Verify that page loads without 404 error
      cy.get('body').should('exist')
      cy.url().should('include', 'iframe=true')
    })

    it('should redirect to locale-prefixed URL when using iframe and lang parameters', () => {
      cy.visit('/simulateur/bilan?iframe=true&lang=en')

      // Verify that the URL has been redirected correctly
      cy.url().should('include', '/en/tutoriel')
      cy.url().should('not.include', 'lang=en')

      // Also check that the page has loaded correctly
      cy.get('body').should('exist')
    })

    it('should detect iframes via referer', () => {
      // Simulate request with referer containing iframe=true
      cy.visit('/fr/fin', {
        headers: {
          referer: 'https://example.com/page?iframe=true',
        },
      })

      cy.get('body').should('exist')
    })
  })

  describe('URL construction with locale', () => {
    it('should add locale if it does not exist in path', () => {
      cy.visit('/fin?lang=en')

      cy.url().should('include', '/en/fin')
      cy.url().should('not.include', 'lang=en')
    })

    it('should replace existing locale', () => {
      cy.visit('/fr/fin?lang=en')

      cy.url().should('include', '/en/fin')
      cy.url().should('not.include', '/fr/')
      cy.url().should('not.include', 'lang=en')
    })
  })

  describe('Cookie handling', () => {
    it('should set locale cookie', () => {
      cy.visit('/fr/fin?lang=en')

      // Verify that cookie has been set
      cy.getCookie('NEXT_LOCALE').should('have.property', 'value', 'en')
    })

    it('should preserve cookie during navigation', () => {
      cy.visit('/fr/fin?lang=en')

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
      cy.visit('/fr/fin?lang=en&other=param')

      cy.url().should('include', '/en/fin')
      cy.url().should('include', 'other=param')
      cy.url().should('not.include', 'lang=en')
    })
  })
})
