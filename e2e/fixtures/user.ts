import { faker } from '@faker-js/faker'
import type { Page } from '@playwright/test'
import { test as base, expect } from './options'

import {
  getPlaywrightState,
  savePlaywrightState,
} from '../helpers/save-context'
import { UserMailbox } from '../helpers/user-mailbox'

function generateUserData() {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  return {
    firstName,
    lastName,
    email: faker.internet.email({
      provider: process.env.MAILISK_NAMESPACE! + '.mailisk.net',
      firstName,
      lastName,
    }),
  }
}

interface Data {
  firstName: string
  lastName: string
  email: string
  savedSimulationLink?: string
}

export class User {
  public readonly mailbox: UserMailbox
  constructor(
    public readonly page: Page,
    private readonly data: Data = generateUserData()
  ) {
    this.mailbox = new UserMailbox(this.email)
  }

  get fullName() {
    return `${this.data.firstName} ${this.data.lastName}`
  }

  get email() {
    return this.data.email.toLowerCase()
  }

  get firstName() {
    return this.data.firstName
  }

  get lastName() {
    return this.data.lastName
  }

  get savedSimulationLink() {
    return this.data.savedSimulationLink!
  }

  async readSavedSimulationEmail() {
    // User should receive a confirmation email
    const confirmationEmail = await this.mailbox.lookup(
      'Retrouvez vos résultats dans votre espace Nos Gestes Climat'
    )
    expect(confirmationEmail).toBeDefined()
    const simulationUrl = new RegExp(`/fin\\?sid=[^\\s]+`)
    const match = simulationUrl.exec(confirmationEmail!.text!)
    expect(match).not.toBeNull()
    this.data.savedSimulationLink = match![0]
  }

  async fillEmailAndCompleteVerification() {
    const emailInput = 'verification-code-email-input'
    await this.page.getByTestId(emailInput).scrollIntoViewIfNeeded()
    await this.page.getByTestId(emailInput).fill(this.email)
    await this.page.waitForTimeout(500)
    await this.page.getByTestId(emailInput).press('Enter')
    const codeInput = this.page.getByTestId('verification-code-input')
    await expect(codeInput).toBeInViewport()
    const code = await this.mailbox.getVerificationCode()
    await codeInput.fill(code)
  }

  async saveInContext() {
    await savePlaywrightState(this.page, 'user', this.data)
  }

  static async fromContext(page: Page) {
    const data = await getPlaywrightState<Data>(page, 'user')
    return new User(page, data)
  }
}

interface UserFixtures {
  user: User
}

const test = base.extend<UserFixtures>({
  user: async ({ page }, use) => {
    await use(await User.fromContext(page))
  },
})

export { expect, test }
