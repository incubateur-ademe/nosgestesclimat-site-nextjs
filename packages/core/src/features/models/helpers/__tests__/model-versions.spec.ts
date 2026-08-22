import { describe, expect, it } from 'vitest'
import {
  parseModelString,
  parseModelVersionString,
  serializeModelString,
  serializeModelVersionString,
} from '../model-versions.ts'

describe('parseModelVersionString', () => {
  it('reads a published tag', () => {
    expect(parseModelVersionString('4.14.2')).toEqual({
      publishedTag: '4.14.2',
    })
  })

  it('reads a prerelease published tag', () => {
    expect(parseModelVersionString('4.15.0-beta.1')).toEqual({
      publishedTag: '4.15.0-beta.1',
    })
  })

  it('reads a PR reference', () => {
    expect(parseModelVersionString('pr-1234')).toEqual({ PRNumber: '1234' })
  })

  it('returns null for anything else', () => {
    expect(parseModelVersionString('current')).toBeNull()
    expect(parseModelVersionString('4.14')).toBeNull()
    expect(parseModelVersionString('')).toBeNull()
  })
})

describe('serializeModelVersionString', () => {
  it('round-trips both forms', () => {
    for (const ref of ['4.14.2', 'pr-1234']) {
      expect(serializeModelVersionString(parseModelVersionString(ref)!)).toBe(
        ref
      )
    }
  })
})

describe('parseModelString', () => {
  it('parses a published tag version', () => {
    const result = parseModelString('FR-fr-1.2.3')
    expect(result).toEqual({
      region: 'FR',
      locale: 'fr',
      version: { publishedTag: '1.2.3' },
    })
  })

  it('parses a PR number version', () => {
    const result = parseModelString('FR-fr-pr-42')
    expect(result).toEqual({
      region: 'FR',
      locale: 'fr',
      version: { PRNumber: '42' },
    })
  })

  it('parses with English locale', () => {
    const result = parseModelString('EU-en-2.0.0')
    expect(result).toEqual({
      region: 'EU',
      locale: 'en',
      version: { publishedTag: '2.0.0' },
    })
  })

  it('returns null for an invalid locale', () => {
    expect(parseModelString('FR-de-1.0.0')).toBeNull()
  })

  it('returns null for an invalid version format', () => {
    expect(parseModelString('FR-fr-gibberish')).toBeNull()
  })

  it('returns null for a completely invalid string', () => {
    expect(parseModelString('not-a-model')).toBeNull()
  })

  it('returns null for an empty string', () => {
    expect(parseModelString('')).toBeNull()
  })
})

describe('serializeModelString', () => {
  it('serializes a published tag model', () => {
    expect(
      serializeModelString({
        region: 'FR',
        locale: 'fr',
        version: { publishedTag: '1.2.3' },
      })
    ).toBe('FR-fr-1.2.3')
  })

  it('serializes a PR number model', () => {
    expect(
      serializeModelString({
        region: 'FR',
        locale: 'fr',
        version: { PRNumber: '42' },
      })
    ).toBe('FR-fr-pr-42')
  })

  it('serializes with English locale', () => {
    expect(
      serializeModelString({
        region: 'EU',
        locale: 'en',
        version: { publishedTag: '2.0.0' },
      })
    ).toBe('EU-en-2.0.0')
  })
})
