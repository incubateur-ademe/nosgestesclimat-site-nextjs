import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ModelFileFetchFailedException } from '../exceptions/model-rules.exception.ts'
import { createGetModelRules } from '../get-model-rules.service.ts'
import { CURRENT_MODEL_VERSION } from '../model-versions.ts'

const REMOTE_RULES = { bilan: { formule: 0 } }

describe('createGetModelRules', () => {
  const findCurrentModel = vi.fn()
  const fetchModelFile = vi.fn()
  const captureException = vi.fn()

  beforeEach(() => {
    findCurrentModel.mockResolvedValue({ bilan: { formule: 1 } })
    fetchModelFile.mockResolvedValue(REMOTE_RULES)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('reads the current version from the installed package, without any request', async () => {
    const getModelRules = createGetModelRules({
      findCurrentModel,
      fetchModelFile,
    })

    const rules = await getModelRules({
      region: 'FR',
      locale: 'fr',
      version: { publishedTag: CURRENT_MODEL_VERSION },
    })

    expect(findCurrentModel).toHaveBeenCalledWith('co2-model.FR-lang.fr.json')
    expect(fetchModelFile).not.toHaveBeenCalled()
    expect(rules).toEqual({ bilan: { formule: 1 } })
  })

  it('defaults to FR/fr on the current version', async () => {
    const getModelRules = createGetModelRules({
      findCurrentModel,
      fetchModelFile,
    })

    await getModelRules()

    expect(findCurrentModel).toHaveBeenCalledWith('co2-model.FR-lang.fr.json')
  })

  it('asks for the optimized file when requested', async () => {
    const getModelRules = createGetModelRules({
      findCurrentModel,
      fetchModelFile,
    })

    await getModelRules({ region: 'FR', locale: 'fr' }, { isOptim: true })

    expect(findCurrentModel).toHaveBeenCalledWith(
      'co2-model.FR-lang.fr-opti.json'
    )
  })

  it('fetches a PR version from the preview bucket', async () => {
    const getModelRules = createGetModelRules({
      findCurrentModel,
      fetchModelFile,
    })

    const rules = await getModelRules({
      region: 'UK',
      locale: 'en',
      version: { PRNumber: '1234' },
    })

    expect(fetchModelFile).toHaveBeenCalledWith(
      'https://nosgestesclimat-dev.s3.fr-par.scw.cloud/model/1234/co2-model.UK-lang.en.json'
    )
    expect(rules).toEqual(REMOTE_RULES)
    expect(findCurrentModel).not.toHaveBeenCalled()
  })

  it('fetches an outdated published version from the registry CDN', async () => {
    const getModelRules = createGetModelRules({
      findCurrentModel,
      fetchModelFile,
      captureException,
      outdatedPublishedTagStrategy: 'fetch',
    })

    const rules = await getModelRules({
      region: 'FR',
      locale: 'fr',
      version: { publishedTag: '4.14.2' },
    })

    expect(fetchModelFile).toHaveBeenCalledWith(
      'https://cdn.jsdelivr.net/npm/@incubateur-ademe/nosgestesclimat@4.14.2/public/co2-model.FR-lang.fr.json'
    )
    expect(rules).toEqual(REMOTE_RULES)
    // Computing an old version is expected here, not an anomaly to report.
    expect(captureException).not.toHaveBeenCalled()
  })

  it('reports the mismatch and serves the installed rules under fallback-to-current', async () => {
    const getModelRules = createGetModelRules({
      findCurrentModel,
      fetchModelFile,
      captureException,
      outdatedPublishedTagStrategy: 'fallback_to_current',
    })

    const rules = await getModelRules({
      region: 'FR',
      locale: 'fr',
      version: { publishedTag: '4.14.2' },
    })

    expect(fetchModelFile).not.toHaveBeenCalled()
    expect(findCurrentModel).toHaveBeenCalledWith('co2-model.FR-lang.fr.json')
    expect(rules).toEqual({ bilan: { formule: 1 } })
    expect(captureException).toHaveBeenCalledWith(
      expect.objectContaining({
        message: `Model version mismatch: 4.14.2 !== ${CURRENT_MODEL_VERSION}`,
      })
    )
  })

  it('propagates a failure from the remote fetch', async () => {
    fetchModelFile.mockRejectedValue(
      new ModelFileFetchFailedException({
        message: 'Model file request failed with status 404',
        url: 'https://example.com/co2-model.FR-lang.fr.json',
        status: 404,
      })
    )
    const getModelRules = createGetModelRules({
      findCurrentModel,
      fetchModelFile,
    })

    await expect(
      getModelRules({ region: 'FR', locale: 'fr', version: { PRNumber: '1' } })
    ).rejects.toThrow(ModelFileFetchFailedException)
  })
})
