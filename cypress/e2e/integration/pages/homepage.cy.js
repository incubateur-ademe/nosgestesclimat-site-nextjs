import { visit } from '../../../helpers/interactions/visit'

describe('check for homepage status', () => {
  beforeEach(() => {
    visit('/')
  })

  it('has a start button', () => {
    cy.get('[data-cypress-id="do-the-test-link"]').should('be.visible')
  })
  it('has a amis link', () => {
    cy.get('[data-cypress-id="amis-link"]').should('be.visible')
  })
  it('has a actions link', () => {
    cy.get('[data-cypress-id="actions-link"]').should('be.visible')
  })
  it('has a organisations link', () => {
    cy.get('[data-cypress-id="organisations-link"]').should('be.visible')
  })
  it('has a budget link', () => {
    cy.get('[data-cypress-id="budget-link"]').should('be.visible')
  })
  it('has a nouveautes link', () => {
    cy.get('[data-cypress-id="nouveautes-link"]').should('be.visible')
  })
  it('has a documentation link', () => {
    cy.get('[data-cypress-id="documentation-link"]').should('be.visible')
  })
  it('has a contact link', () => {
    cy.get('[data-cypress-id="contact-link"]').should('be.visible')
  })
})
