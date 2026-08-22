import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { failure, success } from '../../../../lib/result.ts'
import { ModelFileFetchFailedError } from '../../exceptions/errors.ts'
import { CURRENT_MODEL_VERSION } from '../../helpers/model-versions.ts'
import { createGetModelRules } from '../get-model-rules.service.ts'

const REMOTE_RULES = { bilan: { formule: 0 } }

describe('createGetModelRules', () => {
  const findCurrentModel = vi.fn()
  const fetchModelFile = vi.fn()
  const captureException = vi.fn()

  beforeEach(() => {
    findCurrentModel.mockResolvedValue({ bilan: { formule: 1 } })
    fetchModelFile.mockResolvedValue(success(REMOTE_RULES))
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it.each([
    ['FR/fr', 'FR', 'fr', 'co2-model.FR-lang.fr.json'],
    ['UK/fr', 'UK', 'fr', 'co2-model.UK-lang.fr.json'],
    ['FR/en', 'FR', 'en', 'co2-model.FR-lang.en.json'],
  ] as const)(
    'reads the current version from the installed package, without any request: %s',
    async (_label, region, locale, fileName) => {
      const getModelRules = createGetModelRules({
        findCurrentModel,
        fetchModelFile,
      })

      const result = await getModelRules({
        region,
        locale,
        version: { publishedTag: CURRENT_MODEL_VERSION },
      })

      expect(findCurrentModel).toHaveBeenCalledWith(fileName)
      expect(fetchModelFile).not.toHaveBeenCalled()
      expect(result.success).toBe(true)
      if (!result.success) throw new Error('expected success')
      expect(result.data).toEqual({ bilan: { formule: 1 } })
    }
  )

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

  it.each([
    ['UK/en', 'UK', 'en', false, 'co2-model.UK-lang.en.json'],
    ['FR/fr optimized', 'FR', 'fr', true, 'co2-model.FR-lang.fr-opti.json'],
  ] as const)(
    'fetches a PR version from the preview bucket: %s',
    async (_label, region, locale, isOptim, fileName) => {
      const getModelRules = createGetModelRules({
        findCurrentModel,
        fetchModelFile,
      })

      const result = await getModelRules(
        { region, locale, version: { PRNumber: '1234' } },
        { isOptim }
      )

      expect(fetchModelFile).toHaveBeenCalledWith(
        `https://nosgestesclimat-dev.s3.fr-par.scw.cloud/model/1234/${fileName}`
      )
      expect(result.success).toBe(true)
      if (!result.success) throw new Error('expected success')
      expect(result.data).toEqual(REMOTE_RULES)
      expect(findCurrentModel).not.toHaveBeenCalled()
    }
  )

  it.each([
    [
      'FR/fr, explicit fetch strategy',
      'FR',
      'fr',
      false,
      'co2-model.FR-lang.fr.json',
      { outdatedPublishedTagStrategy: 'fetch' },
    ],
    [
      'UK/fr, non-FR region',
      'UK',
      'fr',
      false,
      'co2-model.UK-lang.fr.json',
      { outdatedPublishedTagStrategy: 'fetch' },
    ],
    [
      'FR/en, en locale',
      'FR',
      'en',
      false,
      'co2-model.FR-lang.en.json',
      { outdatedPublishedTagStrategy: 'fetch' },
    ],
    [
      'FR/fr, optimized',
      'FR',
      'fr',
      true,
      'co2-model.FR-lang.fr-opti.json',
      { outdatedPublishedTagStrategy: 'fetch' },
    ],
    [
      'FR/fr, default strategy (omitted)',
      'FR',
      'fr',
      false,
      'co2-model.FR-lang.fr.json',
      {},
    ],
  ] as const)(
    'fetches an outdated published version from the registry CDN: %s',
    async (_label, region, locale, isOptim, fileName, deps) => {
      const getModelRules = createGetModelRules({
        findCurrentModel,
        fetchModelFile,
        captureException,
        ...deps,
      })

      const result = await getModelRules(
        { region, locale, version: { publishedTag: '4.14.2' } },
        { isOptim }
      )

      expect(fetchModelFile).toHaveBeenCalledWith(
        `https://cdn.jsdelivr.net/npm/@incubateur-ademe/nosgestesclimat@4.14.2/public/${fileName}`
      )
      expect(result.success).toBe(true)
      if (!result.success) throw new Error('expected success')
      expect(result.data).toEqual(REMOTE_RULES)
      expect(findCurrentModel).not.toHaveBeenCalled()
      // Computing an old version is expected here, not an anomaly to report.
      expect(captureException).not.toHaveBeenCalled()
    }
  )

  it.each([
    ['not optimized', false, 'co2-model.FR-lang.fr.json'],
    ['optimized', true, 'co2-model.FR-lang.fr-opti.json'],
  ] as const)(
    'reports the mismatch and serves the installed rules under fallback-to-current: %s',
    async (_label, isOptim, fileName) => {
      const getModelRules = createGetModelRules({
        findCurrentModel,
        fetchModelFile,
        captureException,
        outdatedPublishedTagStrategy: 'fallback_to_current',
      })

      const result = await getModelRules(
        { region: 'FR', locale: 'fr', version: { publishedTag: '4.14.2' } },
        { isOptim }
      )

      expect(fetchModelFile).not.toHaveBeenCalled()
      expect(findCurrentModel).toHaveBeenCalledWith(fileName)
      expect(result.success).toBe(true)
      if (!result.success) throw new Error('expected success')
      expect(result.data).toEqual({ bilan: { formule: 1 } })
      expect(captureException).toHaveBeenCalledWith(
        expect.objectContaining({
          message: `Model version mismatch: 4.14.2 !== ${CURRENT_MODEL_VERSION}`,
        })
      )
    }
  )

  it('propagates a failure from findCurrentModel on the current-version path', async () => {
    findCurrentModel.mockRejectedValue(new Error('import failed'))
    const getModelRules = createGetModelRules({
      findCurrentModel,
      fetchModelFile,
    })

    await expect(
      getModelRules({
        region: 'FR',
        locale: 'fr',
        version: { publishedTag: CURRENT_MODEL_VERSION },
      })
    ).rejects.toThrow('import failed')
  })

  it('propagates a failure from the remote fetch', async () => {
    fetchModelFile.mockResolvedValue(
      failure(
        new ModelFileFetchFailedError({
          message: 'Model file request failed with status 404',
          url: 'https://example.com/co2-model.FR-lang.fr.json',
          status: 404,
        })
      )
    )
    const getModelRules = createGetModelRules({
      findCurrentModel,
      fetchModelFile,
    })

    const result = await getModelRules({
      region: 'FR',
      locale: 'fr',
      version: { PRNumber: '1' },
    })

    expect(result.success).toBe(false)
    if (result.success) throw new Error('expected failure')
    expect(result.error).toBeInstanceOf(ModelFileFetchFailedError)
    expect(result.error.status).toBe(404)
  })
})
