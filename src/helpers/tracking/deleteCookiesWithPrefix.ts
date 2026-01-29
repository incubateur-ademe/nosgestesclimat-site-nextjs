/**
 * Deletes all cookies that start with the given prefix.
 * Tries multiple path/domain combinations to ensure deletion.
 */
export function deleteCookiesWithPrefix(prefix: string) {
  if (typeof document === 'undefined') return

  const hostname = typeof window !== 'undefined' ? window.location.hostname : ''

  document.cookie.split(';').forEach((cookie) => {
    const cookieName = cookie.split('=')[0].trim()
    if (cookieName.startsWith(prefix)) {
      // Try multiple path/domain combinations to ensure deletion
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
      if (hostname) {
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${hostname}`
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${hostname}`
      }
    }
  })
}
