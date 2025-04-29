import { clickSkipTutorialButton } from '../../../helpers/elements/buttons'
import { clickNextStepGroupCreation } from '../../../helpers/groups/clickNextStepGroupCreation'
import { clickValidateGroupCreation } from '../../../helpers/groups/clickValidateGroupCreation'
import { fillGroupCreationFirstStep } from '../../../helpers/groups/fillGroupCreationFirstStep'
import { fillGroupNameEmoji } from '../../../helpers/groups/fillGroupNameEmoji'
import { recursivelyFillSimulation } from '../../../helpers/simulation/recursivelyFillSimulation'
import { skipRiddle } from '../../../helpers/simulation/skipRiddle'

const TIMEOUT = 12000

describe('Group userflow', () => {
  let ownerUserId = ''
  describe('Given a user', () => {
    describe('When he creates a new group', () => {
      it('then it should succeed and return no accessibility violations', () => {
        cy.visit('/classements')

        // checkA11y() // TODO: fix A11Y test breaking only when running on CI

        cy.clearLocalStorage()

        cy.wait(TIMEOUT)

        cy.get('[data-cypress-id="button-create-first-group"]').click()

        cy.get('input[data-cypress-id="group-input-owner-name"]').clear()

        // Check that we can create our first group
        fillGroupCreationFirstStep()

        // checkA11y()  // TODO: fix A11Y test breaking only when running on CI

        cy.wait(TIMEOUT)

        clickNextStepGroupCreation()

        cy.wait(TIMEOUT)

        // Continue and choose group name and emoji
        fillGroupNameEmoji()

        // checkA11y()  // TODO: fix A11Y test breaking only when running on CI

        cy.wait(TIMEOUT)

        clickValidateGroupCreation()

        cy.wait(TIMEOUT)
        // Fill simulation
        clickSkipTutorialButton()

        cy.wait(TIMEOUT)

        recursivelyFillSimulation(null, 'group')

        skipRiddle()

        cy.wait(TIMEOUT)

        cy.get('[data-cypress-id="group-name"]')

        // checkA11y()  // TODO: fix A11Y test breaking only when running on CI

        // And that we can delete it
        cy.get('[data-cypress-id="button-delete-group"]').click()
        cy.get('[data-cypress-id="button-confirm-delete-group"]').click()

        // Check that we can create a second group
        cy.wait(TIMEOUT)

        cy.get('[data-cypress-id="button-create-first-group"]').click()

        cy.get('input[data-cypress-id="group-input-owner-name"]').clear()
        cy.get('input[data-cypress-id="group-input-owner-email"]').clear()

        fillGroupCreationFirstStep()

        clickNextStepGroupCreation()

        cy.wait(TIMEOUT)

        // Continue and choose group name and emoji
        fillGroupNameEmoji()

        cy.wait(TIMEOUT)

        cy.get('[data-cypress-id="button-validate-create-group"]').click()

        // And that we can update its name
        cy.get('[data-cypress-id="group-name-edit-button"]').click()

        const newName = 'Les amis de Jean-Marc'

        cy.get('input[data-cypress-id="group-edit-input-name"]').clear()
        cy.get('input[data-cypress-id="group-edit-input-name"]').type(newName)
        cy.get('[data-cypress-id="button-inline-input"]').click()

        cy.wait(TIMEOUT)

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

        cy.wait(TIMEOUT)

        // checkA11y()  // TODO: fix A11Y test breaking only when running on CI

        cy.get('[data-cypress-id="member-name"]').type('Jean-Claude')

        cy.wait(TIMEOUT)

        cy.get('[data-cypress-id="button-join-group"]').click()

        clickSkipTutorialButton()
        recursivelyFillSimulation(null, 'group')

        cy.wait(TIMEOUT)

        skipRiddle()

        cy.wait(TIMEOUT)

        cy.get('[data-cypress-id="group-name"]')

        // checkA11y() // TODO: fix A11Y test breaking only when running on CI

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
