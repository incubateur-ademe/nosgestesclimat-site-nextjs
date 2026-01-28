import { expect, test } from '../fixtures'
import { Group } from '../fixtures/groups'
import { TutorialPage } from '../fixtures/tutorial'
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
    group,
  }) => {
    await userSpace.goto()
    await group.goFromGroupTabs(page)
  })

  test.describe('can create a new group and delete it', () => {
    let newGroup: Group
    test.beforeEach(async ({ page, user }) => {
      newGroup = new Group(page, user)
      await page.goto(Group.CREATION_URL)
      await page.waitForTimeout(500)
      await newGroup.create()
    })

    test('and change its name', async ({ page }) => {
      await newGroup.changeName()
      await expect(
        page.getByTestId('group-name').getByText(newGroup.name)
      ).toBeVisible()
    })

    test.afterEach(async ({ page }) => {
      await newGroup.delete()
      await expect(page).toHaveURL('/mon-espace/groupes')
      await expect(page.getByText(newGroup.name)).not.toBeVisible()
    })
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
  test.beforeEach(async ({ group, page, browser }) => {
    if (browser.browserType().name() === 'webkit') {
      // @TODO it seems that the guard logic on safari mobile does'nt work very well
      test.skip()
    }
    await page.goto(group.url)
  })

  test('displays group name in h1', async ({ group, page }) => {
    await expect(page.locator('h1')).toHaveText(group.name)
  })

  test('has an invite link that can be copied with good utm', async ({
    group,
    baseURL,
  }) => {
    const clipboardContent = await group.copyInviteLink()
    expect(clipboardContent).toMatch(new RegExp('^' + baseURL))
    expect(clipboardContent).toMatch(/utm_medium=sharelink/)
    expect(clipboardContent).toMatch(/utm_source=NGC/)
  })

  test('displays main section', async ({ page }) => {
    await expect(page.getByTestId('votre-empreinte-title')).toBeVisible()
  })
})

test.describe('A new user', () => {
  test.use({ storageState: NEW_VISITOR_STATE })
  test.beforeEach(({ browser }) => {
    if (browser.browserType().name() === 'webkit') {
      // @TODO it seems that the guard logic on safari mobile does'nt work very well
      test.skip()
    }
  })

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

  test('can join a group and fill its email', async ({ page, user, group }) => {
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
    test.setTimeout(60_000)
    await group.joinWithInviteLink(user)
    await tutorialPage.skip()
    await ngcTest.skipAllQuestions()
    await expect(page).toHaveURL(group.url)
  })
})

test.describe('A user with a completed test that joined a group', () => {
  test.use({ storageState: COMPLETED_TEST_STATE })
  // @TODO : fix when redirection is working better
  test.skip()
  test.beforeEach(async ({ user, group, page }) => {
    await group.joinWithInviteLink(user)
    await page.waitForLoadState('networkidle')
  })

  test.afterEach(async ({ user, group }) => {
    await group.leave(user)
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
    await group.goFromGroupTabs(page)
    await expect(page).toHaveURL(group.url)
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
    group,
  }) => {
    await page.goto(group.url)
    await expect(page.locator('h1')).toContainText(group.name)
  })
})
