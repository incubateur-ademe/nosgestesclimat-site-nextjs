import { BrevoMailbox } from './brevo-mailbox'
import { StubMailbox } from './stub-mailbox'
import type { MailboxAdapter } from './types'

export const createMailboxAdapter = (): MailboxAdapter =>
  process.env.E2E_MAILBOX === 'brevo' ? new BrevoMailbox() : new StubMailbox()

export const testEmailDomain = (): string => {
  const domain = process.env.E2E_TEST_EMAIL_DOMAIN
  if (!domain) {
    throw new Error('E2E_TEST_EMAIL_DOMAIN is required.')
  }
  return domain
}
