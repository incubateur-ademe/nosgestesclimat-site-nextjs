import { describe, expect, it } from 'vitest'

import { getLegacyCookieDomains } from '../legacy-domains'

describe('getLegacyCookieDomains', () => {
  it('returns only the apex on prod', () => {
    expect(getLegacyCookieDomains('nosgestesclimat.fr')).toEqual([
      'nosgestesclimat.fr',
    ])
  })

  it('returns the subdomain and the apex on preprod', () => {
    expect(getLegacyCookieDomains('preprod.nosgestesclimat.fr')).toEqual([
      'preprod.nosgestesclimat.fr',
      'nosgestesclimat.fr',
    ])
  })

  it('returns only its own host on a review app', () => {
    expect(
      getLegacyCookieDomains(
        'nosgestesclimat-site-preprod-pr2030.osc-fr1.scalingo.io'
      )
    ).toEqual(['nosgestesclimat-site-preprod-pr2030.osc-fr1.scalingo.io'])
  })

  it('returns only its own host on localhost', () => {
    expect(getLegacyCookieDomains('localhost')).toEqual(['localhost'])
  })
})
