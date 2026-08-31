import { FF_COOKIE_NAME } from '@/services/feature-flags/constants'
import { getCookieOptions } from './helpers'
import type { CookieToSet } from './types'

/**
 * Cookies are now host-only (no `domain` attribute), but the old
 * domain-scoped variants (`Domain=nosgestesclimat.fr`) survive until they
 * expire (up to 180 days) and are read *first* by the browser (RFC 6265
 * §5.4 — when several cookies match, the earliest creation wins). They keep
 * leaking prod tokens to preprod during that window, so this module actively
 * purges them from every response while the migration is active.
 *
 * The migration window is bounded by LEGACY_COOKIE_MIGRATION_UNTIL_MS (a
 * hard-coded date): once past it, no legacy cookie can still be alive and
 * the whole file can be deleted.
 */
const LEGACY_COOKIE_MIGRATION_UNTIL_MS = Date.parse('2027-04-01T00:00:00Z')

export function isLegacyCookieMigrationActive(): boolean {
  return Date.now() < LEGACY_COOKIE_MIGRATION_UNTIL_MS
}

/**
 * Domains that may carry a legacy domain-scoped variant of a cookie for
 * `hostname`. The apex purges its own; a subdomain (preprod) must also purge
 * the apex-scoped cookies set by prod, which the browser sends along.
 */
export function getLegacyCookieDomains(hostname: string): string[] {
  return hostname === 'nosgestesclimat.fr'
    ? [hostname]
    : [hostname, 'nosgestesclimat.fr']
}

/**
 * Base options used to purge a legacy cookie. They reproduce the attributes
 * the cookie was originally set with so the purge matches the same cookie
 * jar (CHIPS partition included): `partitioned` only works when the deletion
 * cookie carries the same attributes.
 */
function legacyPurgeOptions(cookieName: string): CookieToSet['options'] {
  const options = getCookieOptions()
  if (cookieName === FF_COOKIE_NAME) {
    return { ...options, httpOnly: false, sameSite: 'lax', partitioned: false }
  }
  return options
}

/**
 * Serialize a purge `CookieToSet` into a raw `Set-Cookie` header value.
 *
 * This bypasses `NextResponse.cookies.set()`: the response cookie jar is a
 * Map keyed by cookie name, so two cookies with the same name but different
 * attributes (host-only vs domain-scoped) cannot coexist through that API.
 * Raw `headers.append` can.
 */
export function stringifyPurgeCookie({
  name,
  value,
  options,
}: CookieToSet): string {
  const parts = [`${name}=${value}`]

  parts.push(`Path=${options?.path ?? '/'}`)

  if (options?.domain) {
    parts.push(`Domain=${options.domain}`)
  }

  parts.push(`Max-Age=${options?.maxAge ?? 0}`)

  if (options?.secure) {
    parts.push('Secure')
  }

  if (options?.sameSite) {
    const sameSite = String(options.sameSite)
    parts.push(`SameSite=${sameSite[0].toUpperCase()}${sameSite.slice(1)}`)
  }

  if (options?.partitioned) {
    parts.push('Partitioned')
  }

  if (options?.httpOnly) {
    parts.push('HttpOnly')
  }

  return parts.join('; ')
}

export function buildLegacyCookiePurges(cookieNames: string[]): CookieToSet[] {
  if (!isLegacyCookieMigrationActive()) return []

  const domains = getLegacyCookieDomains(
    new URL(process.env.NEXT_PUBLIC_SITE_URL!).hostname
  )

  return cookieNames.flatMap((name) =>
    domains.map((domain) => ({
      name,
      value: '',
      options: { ...legacyPurgeOptions(name), domain, maxAge: 0 },
    }))
  )
}
