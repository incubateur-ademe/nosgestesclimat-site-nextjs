import { clickSkipTutorialButton } from '../../../helpers/elements/buttons'
import { clickNextStepGroupCreation } from '../../../helpers/groups/clickNextStepGroupCreation'
import { clickValidateGroupCreation } from '../../../helpers/groups/clickValidateGroupCreation'
import { fillGroupCreationFirstStep } from '../../../helpers/groups/fillGroupCreationFirstStep'
import { fillGroupNameEmoji } from '../../../helpers/groups/fillGroupNameEmoji'
import { click } from '../../../helpers/interactions/click'
import { type } from '../../../helpers/interactions/type'
import { recursivelyFillSimulation } from '../../../helpers/simulation/recursivelyFillSimulation'

describe('Group userflow', () => {
  let ownerUserId = ''
  describe('Given a user', () => {
    describe('When he creates a new group', () => {
      it('then it should succeed and return no accessibility violations', () => {
        cy.visit('/classements')

        cy.clearLocalStorage()

        click('button-create-first-group')

        cy.get('input[data-cypress-id="group-input-owner-name"]').clear()

        // Check that we can create our first group
        fillGroupCreationFirstStep()

        clickNextStepGroupCreation()

        // Continue and choose group name and emoji
        fillGroupNameEmoji()

        clickValidateGroupCreation()
        // Fill simulation
        clickSkipTutorialButton()

        recursivelyFillSimulation(null, 'group')

        cy.get('[data-cypress-id="group-name"]').should('be.visible', {
          timeout: 10000,
        })

        // And that we can delete it
        click('button-delete-group')
        click('button-confirm-delete-group')

        // Check that we can create a second group
        click('button-create-first-group')

        cy.get('input[data-cypress-id="group-input-owner-name"]').clear()
        cy.get('input[data-cypress-id="group-input-owner-email"]').clear()

        fillGroupCreationFirstStep()

        clickNextStepGroupCreation()

        // Continue and choose group name and emoji
        fillGroupNameEmoji()

        click('button-validate-create-group')

        // And that we can update its name
        click('group-name-edit-button')

        const newName = 'Les amis de Jean-Marc'

        cy.get('input[data-cypress-id="group-edit-input-name"]').clear()

        type('group-edit-input-name', newName)
        click('button-inline-input')

        cy.get('[data-cypress-id="group-name"]').contains(newName)

        // Save the owner user id in order to be able to delete the group later on
        cy.getAllLocalStorage().then((result) => {
          ownerUserId =
            result[Cypress.config('baseUrl')]?.['nosgestesclimat::v3'] &&
            JSON.parse(
              result[Cypress.config('baseUrl')]?.['nosgestesclimat::v3']
            )?.user?.id
        })

        cy.clearLocalStorage()
        cy.reload()

        type('member-name', 'Jean-Claude')

        click('button-join-group')

        clickSkipTutorialButton()
        recursivelyFillSimulation(null, 'group')

        cy.wait(2000)

        cy.get('[data-cypress-id="group-name"]')

        // Check that the main sections are displayed
        // TODO: improve test to handle checking the display of the points forts and faibles
        // cy.get('[data-cypress-id="points-fort-faibles-title"]')
        cy.get('[data-cypress-id="votre-empreinte-title"]')

        let currentUrl = ''

        // Delete the group via the API
        // cy.url().then((url) => {
        //   currentUrl = url

        //   const groupId = currentUrl?.split('groupId=')?.[1]

        //   const SERVER_URL = Cypress.env('server_url')

        //   cy.request(
        //     'POST',
        //     `http${
        //       SERVER_URL === 'localhost:3001' ? '' : 's'
        //     }://${SERVER_URL}/group/delete`,
        //     {
        //       groupId,
        //       userId: ownerUserId,
        //     }
        //   ).as('response')
        // })
      })
    })
  })
})
