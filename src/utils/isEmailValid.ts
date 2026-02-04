import { t } from '@/helpers/metadata/fakeMetadataT'

/**
 * Microsoft domains that are temporarily blocked due to technical issues
 */
const BLOCKED_MICROSOFT_DOMAINS = ['outlook', 'hotmail', 'live', 'msn'] as const

/**
 * Error message for blocked Microsoft email addresses
 */
export const MICROSOFT_EMAIL_ERROR_MESSAGE = t(
  "Nous rencontrons actuellement un problème technique avec les adresses Microsoft (@outlook, @hotmail, @live, @msn) et faisons tout pour le résoudre. Merci d'utiliser une autre adresse e-mail en attendant."
)

/**
 * Check if an email address is from a blocked Microsoft domain
 */
export const isMicrosoftEmail = (email: string | undefined): boolean => {
  if (!email) return false

  const domain = email.split('@')[1]?.toLowerCase()
  if (!domain) return false

  return BLOCKED_MICROSOFT_DOMAINS.some(
    (blockedDomain) =>
      domain === blockedDomain ||
      domain.startsWith(`${blockedDomain}.`) ||
      domain.includes(`.${blockedDomain}.`)
  )
}

/**
 * Return true if the email is valid OR if there is no email
 */
export const isEmailValid = (email: string | undefined): boolean => {
  if (
    email &&
    !/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.exec(
      email
    )
  ) {
    return false
  }

  return true
}
