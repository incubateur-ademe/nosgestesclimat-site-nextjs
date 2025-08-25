export const dismissCookieBanner = () => {
  // Check if cookie banner exists without waiting for it
  cy.get('body').then(($body) => {
    const bannerExists =
      $body.find('[data-testid="cookie-banner-title"]').length > 0

    if (bannerExists) {
      // If banner exists, wait for it to be visible and dismiss it
      cy.get('[data-testid="cookie-banner-title"]')
        .should('be.visible')
        .then(() => {
          cy.get('[data-testid="cookie-banner-refuse-button"]')
            .should('be.visible')
            .should('not.be.disabled')
            .click()
        })
    } else {
      // If no banner, just continue
      cy.log('Cookie banner not present')
    }
  })
}
