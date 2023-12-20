import { clickSkipTutorialButton } from '../../../helpers/elements/buttons'
import { recursivelyFillSimulation } from '../../../helpers/simulation/recursivelyFillSimulation'

describe(
  'The Group creation page /amis/creer',
  { testIsolation: false },
  () => {
    let ownerUserId = ''

    it('allows to create a new group and displays it afterwards', () => {
      cy.visit('/amis')

      cy.clearLocalStorage()

      // Check that we can create our first group
      cy.get('[data-cypress-id="button-create-first-group"]').click()
      cy.get('input[data-cypress-id="group-input-owner-name"]').type(
        'Jean-Marc'
      )
      cy.get('[data-cypress-id="button-create-group"]').click()

      cy.wait(2000)

      // Fill simulation
      clickSkipTutorialButton()

      cy.wait(2000)

      recursivelyFillSimulation(null, 'group')

      cy.wait(2000)

      cy.get('[data-cypress-id="group-name"]')
    })

    it('should allow to delete a group', () => {
      // And that we can delete it
      cy.get('[data-cypress-id="button-delete-group"]').click()
      cy.get('[data-cypress-id="button-confirm-delete-group"]').click()
    })

    it('should allow to modify the title of a group', () => {
      // Check that we can create a second group
      cy.wait(2000)

      cy.visit('/amis')

      cy.get('[data-cypress-id="button-create-first-group"]').click()

      cy.get('input[data-cypress-id="group-input-owner-name"]').clear()

      cy.get('input[data-cypress-id="group-input-owner-name"]').type(
        'Jean-Marc groupe 2'
      )
      cy.get('[data-cypress-id="button-create-group"]').click()
      cy.get('[data-cypress-id="group-name"]')

      // And that we can update its name
      cy.get('[data-cypress-id="group-name-edit-button"]').click()

      const newName = 'Les amis de Jean-Marc'

      cy.get('input[data-cypress-id="group-edit-input-name"]').clear()
      cy.get('input[data-cypress-id="group-edit-input-name"]').type(newName)
      cy.get('[data-cypress-id="button-inline-input"]').click()
      cy.get('[data-cypress-id="group-name"]').contains(newName)

      // Save the owner user id in order to be able to delete the group later on
      cy.getAllLocalStorage().then((result) => {
        ownerUserId =
          result['http://localhost:3000']?.['nosgestesclimat::v3'] &&
          JSON.parse(result['http://localhost:3000']?.['nosgestesclimat::v3'])
            ?.user?.id
      })
    })

    it('allows to join a group with the invitation link and display the group results', () => {
      cy.clearLocalStorage()
      cy.reload()

      cy.wait(3000)

      cy.get('[data-cypress-id="member-name"]').type('Jean-Claude')
      cy.get('[data-cypress-id="button-join-group"]').click()

      clickSkipTutorialButton()
      recursivelyFillSimulation(null, 'group')

      cy.wait(3000)

      cy.get('[data-cypress-id="group-name"]')

      // Check that the main sections are displayed
      cy.get('[data-cypress-id="points-fort-faibles-title"]')
      cy.get('[data-cypress-id="votre-empreinte-title"]')

      let currentUrl = ''

      // Delete the group via the API
      cy.url().then((url) => {
        currentUrl = url

        const groupId = currentUrl?.split('groupId=')?.[1]

        const SERVER_URL = 'nosgestesclimat.osc-fr1.scalingo.io'

        cy.request(
          'POST',
          `http${
            SERVER_URL === 'localhost:3001' ? '' : 's'
          }://${SERVER_URL}/group/delete`,
          {
            groupId,
            userId: ownerUserId,
          }
        ).as('response')
      })
    })
  }
)
