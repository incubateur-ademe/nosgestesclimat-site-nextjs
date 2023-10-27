describe('Visual regression tests of static pages', () => {
  it('Should match previous screenshot "Accueil"', () => {
    cy.visit('/')
    cy.matchImageSnapshot()
  })
  it('Should match previous screenshot "À propos"', () => {
    cy.visit('/a-propos')
    cy.matchImageSnapshot()
  })
  it('Should match previous screenshot "Accessibilite"', () => {
    cy.visit('/accessibilite')
    cy.matchImageSnapshot()
  })
  it('Should match previous screenshot "Amis"', () => {
    cy.visit('/amis')
    cy.matchImageSnapshot()
  })
  it('Should match previous screenshot "Nouveautes"', () => {
    cy.visit('/nouveautes')
    cy.matchImageSnapshot()
  })
  it('Should match previous screenshot "Personas"', () => {
    cy.visit('/personas')
    cy.matchImageSnapshot()
  })
  it('Should match previous screenshot "Actions"', () => {
    cy.visit('/actions')
    cy.matchImageSnapshot()
  })
  it('Should match previous screenshot "FAQ"', () => {
    cy.visit('/questions-frequentes')
    cy.matchImageSnapshot()
  })
  it('Should match previous screenshot "Profil"', () => {
    cy.visit('/profil')
    cy.matchImageSnapshot()
  })
  it('Should match previous screenshot "Diffuser"', () => {
    cy.visit('/diffuser')
    cy.matchImageSnapshot()
  })
  it('Should match previous screenshot "Nouveautes"', () => {
    cy.visit('/nouveautes')
    cy.matchImageSnapshot()
  })
  it('Should match previous screenshot "International"', () => {
    cy.visit('/international')
    cy.matchImageSnapshot()
  })
  it('Should match previous screenshot "Blog"', () => {
    cy.visit('/blog')
    cy.matchImageSnapshot()
  })
  it('Should match previous screenshot "Ambassadeurs"', () => {
    cy.visit('/ambassadeurs')
    cy.matchImageSnapshot()
  })
  it('Should match previous screenshot "Plan du site"', () => {
    cy.visit('/plan-du-site')
    cy.matchImageSnapshot()
  })
  it('Should match previous screenshot "Accessibilite"', () => {
    cy.visit('/accessibilite')
    cy.matchImageSnapshot()
  })
})
