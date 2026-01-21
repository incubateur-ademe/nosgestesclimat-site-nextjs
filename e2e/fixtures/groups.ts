import { faker } from '@faker-js/faker'
import type { Page } from '@playwright/test'

import {
  getPlaywrightState,
  savePlaywrightState,
} from '../helpers/save-context'
import { GROUP_ADMIN_STATE } from '../state'
import { test as base, expect, User } from './user'

function generateName() {
  return `${faker.word.adjective()} ${faker.word.noun()}`
}

interface Data {
  name: string
  inviteLink?: string
  url?: string
}
export class Group {
  static CREATION_URL = '/amis/creer'

  constructor(
    public readonly page: Page,
    public admin: User,
    public readonly data: Data = {
      name: generateName(),
    }
  ) {}

  get name() {
    return this.data.name
  }

  get url() {
    return this.data.url!
  }

  get inviteLink() {
    return this.data.inviteLink!
  }

  async create() {
    await this.page
      .getByTestId('group-input-owner-name')
      .fill(this.admin.firstName)
    await this.page.getByTestId('group-name').fill(this.name)
    await this.page.getByTestId(`group-select-emoji-🍒`).click()
    await this.page.getByTestId('button-validate-create-group').click()
    await this.page.waitForLoadState('networkidle')
    await expect(this.page).toHaveURL(/groupId=.*/)
    this.data.url = this.page.url()
  }

  async delete() {
    await this.page.getByTestId('button-delete-group').click()
    await this.page.getByTestId('button-confirm-delete-group').click()
  }

  async changeName() {
    this.data.name = generateName()
    await this.page.getByTestId('group-name-edit-button').click()
    await this.page.getByTestId('group-edit-input-name').fill(this.name)
    await this.page.getByTestId('button-inline-input').click()
    await this.page.waitForLoadState('networkidle')
  }

  async joinWithInviteLink(user: User, { fillEmail = false } = {}) {
    await user.page.goto(this.inviteLink)
    await user.page.getByTestId('member-name').fill(user.firstName)
    await user.page.getByTestId('button-join-group-next').click()
    if (fillEmail) {
      await user.fillEmailAndCompleteVerification()
    } else {
      await user.page.getByTestId('verification-code-submit-button').click()
    }
  }

  async leave(user: User) {
    await user.page.getByTestId('button-leave-group').click()
    await user.page.getByTestId('button-confirm-leave-group').click()
  }

  async copyInviteLink() {
    await this.page
      .context()
      .grantPermissions(['clipboard-read', 'clipboard-write'])
    await this.page.getByTestId('invite-button').click()
    const clipboardContent = await this.page.evaluate(() => {
      return navigator.clipboard.readText()
    })
    this.data.inviteLink = clipboardContent
    return clipboardContent
  }

  static async goFromGroupTabs(page: Page) {
    await page.getByTestId('my-groups-tab').click()
    await page.getByRole('link', { name: 'Créer un groupe' }).click()
  }

  async saveInContext() {
    await this.admin.saveInContext()
    await savePlaywrightState(this.page, 'group', this.data)
  }

  static async fromContext(page: Page) {
    const data = await getPlaywrightState<Data>(page, 'group')
    const admin = await User.fromContext(page)

    return new Group(page, admin, data)
  }
}

interface GroupPageFixtures {
  group: Group
}

const test = base.extend<GroupPageFixtures>({
  group: async ({ browser, user, setup, page, storageState }, use) => {
    if (setup) {
      return use(new Group(page, user))
    }

    const useCurrentContext = storageState === GROUP_ADMIN_STATE
    if (useCurrentContext) {
      return use(await Group.fromContext(page))
    }

    const context = await browser.newContext({
      storageState: GROUP_ADMIN_STATE,
    })

    page = await context.newPage()
    await use(await Group.fromContext(page))
    await page.context().close()
  },
})

export { expect, test }
