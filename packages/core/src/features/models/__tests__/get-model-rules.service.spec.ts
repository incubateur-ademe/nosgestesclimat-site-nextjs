import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ModelFileFetchFailedException } from '../exceptions/model-rules.exception.ts'
import { createGetModelRules } from '../get-model-rules.service.ts'
import { CURRENT_MODEL_VERSION } from '../model-versions.ts'

const REMOTE_RULES = { bilan: { formule: 0 } }

const okResponse = () => ({
  ok: true,
  json: () => Promise.resolve(REMOTE_RULES),
})

describe('createGetModelRules', () => {
  const findCurrentModel = vi.fn()
  const captureException = vi.fn()

  beforeEach(() => {
    findCurrentModel.mockResolvedValue({ bilan: { formule: 1 } })
  })

  afterEach(() => {
    vi.clearAllMocks()
    vi.unstubAllGlobals()
  })

  it('reads the current version from the installed package, without any request', async () => {
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)
    const getModelRules = createGetModelRules({ findCurrentModel })

    const rules = await getModelRules({
      region: 'FR',
      locale: 'fr',
      version: { publishedTag: CURRENT_MODEL_VERSION },
    })

    expect(findCurrentModel).toHaveBeenCalledWith('co2-model.FR-lang.fr.json')
    expect(fetchMock).not.toHaveBeenCalled()
    expect(rules).toEqual({ bilan: { formule: 1 } })
  })

  it('defaults to FR/fr on the current version', async () => {
    const getModelRules = createGetModelRules({ findCurrentModel })

    await getModelRules()

    expect(findCurrentModel).toHaveBeenCalledWith('co2-model.FR-lang.fr.json')
  })

  it('asks for the optimized file when requested', async () => {
    const getModelRules = createGetModelRules({ findCurrentModel })

    await getModelRules({ region: 'FR', locale: 'fr' }, { isOptim: true })

    expect(findCurrentModel).toHaveBeenCalledWith(
      'co2-model.FR-lang.fr-opti.json'
    )
  })

  it('fetches a PR version from the preview bucket', async () => {
    const fetchMock = vi.fn().mockResolvedValue(okResponse())
    vi.stubGlobal('fetch', fetchMock)
    const getModelRules = createGetModelRules({ findCurrentModel })

    const rules = await getModelRules({
      region: 'UK',
      locale: 'en',
      version: { PRNumber: '1234' },
    })

    expect(fetchMock).toHaveBeenCalledWith(
      'https://nosgestesclimat-dev.s3.fr-par.scw.cloud/model/1234/co2-model.UK-lang.en.json',
      expect.anything()
    )
    expect(rules).toEqual(REMOTE_RULES)
    expect(findCurrentModel).not.toHaveBeenCalled()
  })

  it('fetches an outdated published version from the registry CDN', async () => {
    const fetchMock = vi.fn().mockResolvedValue(okResponse())
    vi.stubGlobal('fetch', fetchMock)
    const getModelRules = createGetModelRules({
      findCurrentModel,
      captureException,
      outdatedPublishedTagStrategy: 'fetch',
    })

    const rules = await getModelRules({
      region: 'FR',
      locale: 'fr',
      version: { publishedTag: '4.14.2' },
    })

    expect(fetchMock).toHaveBeenCalledWith(
      'https://cdn.jsdelivr.net/npm/@incubateur-ademe/nosgestesclimat@4.14.2/public/co2-model.FR-lang.fr.json',
      expect.anything()
    )
    expect(rules).toEqual(REMOTE_RULES)
    // Computing an old version is expected here, not an anomaly to report.
    expect(captureException).not.toHaveBeenCalled()
  })

  it('reports the mismatch and serves the installed rules under fallback-to-current', async () => {
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)
    const getModelRules = createGetModelRules({
      findCurrentModel,
      captureException,
      outdatedPublishedTagStrategy: 'fallback_to_current',
    })

    const rules = await getModelRules({
      region: 'FR',
      locale: 'fr',
      version: { publishedTag: '4.14.2' },
    })

    expect(fetchMock).not.toHaveBeenCalled()
    expect(findCurrentModel).toHaveBeenCalledWith('co2-model.FR-lang.fr.json')
    expect(rules).toEqual({ bilan: { formule: 1 } })
    expect(captureException).toHaveBeenCalledWith(
      expect.objectContaining({
        message: `Model version mismatch: 4.14.2 !== ${CURRENT_MODEL_VERSION}`,
      })
    )
  })

  it('throws on a missing remote file instead of resolving to an empty rule set', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: false, status: 404 })
    )
    const getModelRules = createGetModelRules({ findCurrentModel })

    await expect(
      getModelRules({ region: 'FR', locale: 'fr', version: { PRNumber: '1' } })
    ).rejects.toThrow(ModelFileFetchFailedException)
  })

  it('does not retry a 4xx', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: false, status: 404 })
    vi.stubGlobal('fetch', fetchMock)
    const getModelRules = createGetModelRules({ findCurrentModel })

    await expect(
      getModelRules({ region: 'FR', locale: 'fr', version: { PRNumber: '1' } })
    ).rejects.toThrow(ModelFileFetchFailedException)
    expect(fetchMock).toHaveBeenCalledOnce()
  })

  it('retries once on a transient failure', async () => {
    const fetchMock = vi
      .fn()
      .mockRejectedValueOnce(new Error('ECONNRESET'))
      .mockResolvedValueOnce(okResponse())
    vi.stubGlobal('fetch', fetchMock)
    const getModelRules = createGetModelRules({ findCurrentModel })

    const rules = await getModelRules({
      region: 'FR',
      locale: 'fr',
      version: { PRNumber: '1' },
    })

    expect(fetchMock).toHaveBeenCalledTimes(2)
    expect(rules).toEqual(REMOTE_RULES)
  })

  it('gives up after the retry', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: false, status: 502 })
    vi.stubGlobal('fetch', fetchMock)
    const getModelRules = createGetModelRules({ findCurrentModel })

    await expect(
      getModelRules({ region: 'FR', locale: 'fr', version: { PRNumber: '1' } })
    ).rejects.toThrow(ModelFileFetchFailedException)
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })
})
