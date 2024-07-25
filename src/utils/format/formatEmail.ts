export function formatEmail(email: unknown): string {
  if (typeof email !== 'string') {
    throw new Error('Email should be a string')
  }

  return email.trim().toLowerCase()
}
