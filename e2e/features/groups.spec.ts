import { expect, test } from '../fixtures'
import { Group } from '../fixtures/groups'
import { TutorialPage } from '../fixtures/tutorial'
import { saveContext } from '../helpers/save-context'
import {
  COMPLETED_TEST_STATE,
  GROUP_ADMIN_STATE,
  NEW_VISITOR_STATE,
} from '../state'

test.use({ storageState: GROUP_ADMIN_STATE })

test.describe('A group admin', () => {
  test('can go to its group from its user account', async ({
    userSpace,
    page,
  }) => {
    await userSpace.goto()
    await Group.goFromGroupTabs(page)
  })

  test('can create a new group and delete it', async ({ page, user }) => {
    const newGroup = new Group(page, user)
    await page.goto(Group.CREATION_URL)
    await newGroup.create()
    await newGroup.delete()
    await expect(page).toHaveURL('/mon-espace/groupes')
    await expect(page.getByText(newGroup.name)).not.toBeVisible()
  })

  test('lands on the result page if it use its own group invite link', async ({
    page,
    group,
  }) => {
    await page.goto(group.inviteLink)
    await expect(page).toHaveURL(group.url)
  })
})

test.describe('The group result page, when accessed by an admin', () => {
  test.beforeEach(async ({ group, page }) => {
    await page.goto(group.url)
  })

  test('displays group name in h1', async ({ group, page }) => {
    await expect(page.locator('h1')).toHaveText(group.name)
  })

  test('has an invite link that can be copied with good utm', async ({
    group,
  }) => {
    const clipboardContent = await group.copyInviteLink()
    expect(clipboardContent).toMatch(
      new RegExp('^' + process.env.NEXT_PUBLIC_SITE_URL!)
    )
    expect(clipboardContent).toMatch(/utm_medium=sharelink/)
    expect(clipboardContent).toMatch(/utm_source=NGC/)
  })

  test('allows to edit group name', async ({ group, page }) => {
    await group.changeName()
    await page.reload()

    await expect(page.locator('h1')).toHaveText(group.name)

    await group.saveInContext()
    await saveContext(page, GROUP_ADMIN_STATE)
  })

  test('displays main section', async ({ page }) => {
    await expect(page.getByTestId('votre-empreinte-title')).toBeVisible()
  })
})

test.describe('A new user', () => {
  test.use({ storageState: NEW_VISITOR_STATE })

  test('is redirected to the invite screen if it goes to the result page', async ({
    group,
    page,
  }) => {
    await page.goto(group.url)
    await expect(
      page.getByText(
        `${group.admin.firstName} vous a invité à rejoindre le groupe`
      )
    ).toBeInViewport()
  })

  test('can join a group without filling its email', async ({
    group,
    user,
    page,
  }) => {
    await group.joinWithInviteLink(user)
    await expect(page).toHaveURL(new RegExp(TutorialPage.URL))
  })

  test('can join a group and create an account', async ({
    page,
    user,
    group,
  }) => {
    await group.joinWithInviteLink(user, { fillEmail: true })
    await expect(page).toHaveURL(new RegExp(TutorialPage.URL))
  })

  test('can see the group result page once he has completed the test', async ({
    page,
    ngcTest,
    tutorialPage,
    user,
    group,
  }) => {
    await group.joinWithInviteLink(user)
    await tutorialPage.skip()
    await ngcTest.skipAllQuestions()
    await expect(page).toHaveURL(group.url)
    await expect(page.getByText(user.firstName)).toBeVisible()
  })
})

test.describe('A user with a completed test that joined a group', () => {
  test.use({ storageState: COMPLETED_TEST_STATE })
  // TODO
  test.skip()
  test.beforeEach(async ({ user, group, page }) => {
    await group.joinWithInviteLink(user)
    await page.waitForLoadState('networkidle')
  })

  test('can see the group result page directly', async ({
    page,
    user,
    group,
  }) => {
    await expect(page).toHaveURL(group.url)
    await expect(page.getByText(user.firstName)).toBeVisible()
  })

  test('can go to the group from the end page of his test', async ({
    page,
    group,
  }) => {
    await page.goto('/fin')
    await Group.goFromGroupTabs(page)
    await expect(page).toHaveURL(group.url)
  })

  test('can quit the group', async ({ page, group, user }) => {
    await page.goto(group.url)
    await group.leave(user)
    // @TODO QUENTIN : redirected to /connexion
    await expect(page).toHaveURL('/connexion')

    // Check that the user doesn't appear on the group page anymore for the admin
    await group.page.goto(group.url)
    await expect(group.page.getByText(user.firstName)).not.toBeVisible()
  })

  test('when he reuses the invite link, lands directly on the result page', async ({
    page,
    group,
  }) => {
    await page.goto(group.inviteLink)
    await expect(page).toHaveURL(group.url)
  })

  test('can go directly to the result page with the group url', async ({
    page,
    user,
    group,
  }) => {
    await page.goto(group.url)
    await expect(page.locator('h1')).toContainText(user.firstName)
  })
})
