import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

describe('legacy cookie purge', () => {
  beforeEach(() => {
    // Default: inside the migration window (before 2027-04-01).
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-01-01T00:00:00Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllEnvs()
    vi.resetModules()
  })

  describe('getLegacyCookieDomains', () => {
    it('returns only the apex domain when the hostname is the apex', async () => {
      const { getLegacyCookieDomains } = await import('../legacy-purge')

      expect(getLegacyCookieDomains('nosgestesclimat.fr')).toEqual([
        'nosgestesclimat.fr',
      ])
    })

    it('returns the subdomain and the apex for a subdomain hostname', async () => {
      const { getLegacyCookieDomains } = await import('../legacy-purge')

      expect(getLegacyCookieDomains('preprod.nosgestesclimat.fr')).toEqual([
        'preprod.nosgestesclimat.fr',
        'nosgestesclimat.fr',
      ])
    })
  })

  describe('stringifyPurgeCookie', () => {
    it('serializes a session/refresh/region purge (secure, none, partitioned, httpOnly)', async () => {
      const { stringifyPurgeCookie } = await import('../legacy-purge')

      const header = stringifyPurgeCookie({
        name: 'ngc_session',
        value: '',
        options: {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
          partitioned: true,
          path: '/',
          domain: 'nosgestesclimat.fr',
          maxAge: 0,
        },
      })

      expect(header).toBe(
        'ngc_session=; Path=/; Domain=nosgestesclimat.fr; Max-Age=0; ' +
          'Secure; SameSite=None; Partitioned; HttpOnly'
      )
    })

    it('serializes the ff overrides purge (readable, lax, non-partitioned)', async () => {
      const { stringifyPurgeCookie } = await import('../legacy-purge')

      const header = stringifyPurgeCookie({
        name: 'ngc_ff_overrides',
        value: '',
        options: {
          httpOnly: false,
          secure: true,
          sameSite: 'lax',
          partitioned: false,
          path: '/',
          domain: 'nosgestesclimat.fr',
          maxAge: 0,
        },
      })

      expect(header).toBe(
        'ngc_ff_overrides=; Path=/; Domain=nosgestesclimat.fr; Max-Age=0; ' +
          'Secure; SameSite=Lax'
      )
    })

    it('omits the Domain attribute without a domain (dev/localhost)', async () => {
      const { stringifyPurgeCookie } = await import('../legacy-purge')

      const header = stringifyPurgeCookie({
        name: 'ngc_session',
        value: '',
        options: {
          httpOnly: true,
          secure: false,
          sameSite: 'lax',
          partitioned: false,
          path: '/',
          maxAge: 0,
        },
      })

      expect(header).toBe(
        'ngc_session=; Path=/; Max-Age=0; SameSite=Lax; HttpOnly'
      )
    })

    it('omits Secure and SameSite when not set', async () => {
      const { stringifyPurgeCookie } = await import('../legacy-purge')

      const header = stringifyPurgeCookie({
        name: 'ngc_session',
        value: '',
        options: { path: '/', maxAge: 0 },
      })

      expect(header).toBe('ngc_session=; Path=/; Max-Age=0')
    })

    it('defaults Path and Max-Age when absent', async () => {
      const { stringifyPurgeCookie } = await import('../legacy-purge')

      const header = stringifyPurgeCookie({
        name: 'ngc_session',
        value: '',
        options: { domain: 'nosgestesclimat.fr' },
      })

      expect(header).toBe(
        'ngc_session=; Path=/; Domain=nosgestesclimat.fr; Max-Age=0'
      )
    })
  })

  describe('buildLegacyCookiePurges', () => {
    it('returns no purge once the migration window is over', async () => {
      vi.setSystemTime(new Date('2028-01-01T00:00:00Z'))

      const { buildLegacyCookiePurges } = await import('../legacy-purge')

      expect(buildLegacyCookiePurges(['ngc_session'])).toEqual([])
    })

    it('purges each cookie name for every legacy domain of the subdomain', async () => {
      vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://preprod.nosgestesclimat.fr')
      vi.resetModules()

      const { buildLegacyCookiePurges } = await import('../legacy-purge')

      const purges = buildLegacyCookiePurges(['ngc_session', 'ngc_refresh'])

      expect(purges).toHaveLength(4)
      expect(purges.map((purge) => purge.options?.domain)).toEqual([
        'preprod.nosgestesclimat.fr',
        'nosgestesclimat.fr',
        'preprod.nosgestesclimat.fr',
        'nosgestesclimat.fr',
      ])
      expect(purges[0]).toEqual({
        name: 'ngc_session',
        value: '',
        options: {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
          partitioned: true,
          path: '/',
          domain: 'preprod.nosgestesclimat.fr',
          maxAge: 0,
        },
      })
    })

    it('purges only the apex domain on the apex hostname', async () => {
      vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://nosgestesclimat.fr')
      vi.resetModules()

      const { buildLegacyCookiePurges } = await import('../legacy-purge')

      const purges = buildLegacyCookiePurges(['ngc_region'])

      expect(purges).toHaveLength(1)
      expect(purges[0]).toEqual({
        name: 'ngc_region',
        value: '',
        options: {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
          partitioned: true,
          path: '/',
          domain: 'nosgestesclimat.fr',
          maxAge: 0,
        },
      })
    })

    it('uses the readable, lax, non-partitioned options for the ff overrides cookie', async () => {
      vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://nosgestesclimat.fr')
      vi.resetModules()

      const { buildLegacyCookiePurges } = await import('../legacy-purge')

      const [purge] = buildLegacyCookiePurges(['ngc_ff_overrides'])

      expect(purge).toEqual({
        name: 'ngc_ff_overrides',
        value: '',
        options: {
          httpOnly: false,
          secure: true,
          sameSite: 'lax',
          partitioned: false,
          path: '/',
          domain: 'nosgestesclimat.fr',
          maxAge: 0,
        },
      })
    })
  })
})
