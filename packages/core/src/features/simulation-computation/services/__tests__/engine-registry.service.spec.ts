import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { Model, ModelRegion } from '../../../simulations/types/model.ts'
import { CURRENT_MODEL_VERSION } from '../../model-support/model-versions.ts'

const noopLogger = { info: () => {}, debug: () => {} }

describe('engine-registry.service', () => {
  const ORIGINAL_ENV = { ...process.env }

  beforeEach(() => {
    vi.resetModules()
  })

  afterEach(() => {
    process.env = { ...ORIGINAL_ENV }
  })

  it('warms up the configured hot keys and reuses the same engine instance', async () => {
    process.env.ENGINE_HOT_KEYS = 'FR:current'
    const { warmUpHotEngines, getEngineForModel } =
      await import('../engine-registry.service.ts')
    await warmUpHotEngines({ logger: noopLogger })()

    const getEngine = getEngineForModel({ logger: noopLogger })
    const engineA = await getEngine(model('FR'))
    const engineB = await getEngine(model('FR'))
    expect(engineA).toBe(engineB)
  })

  it('ignores locale and reuses the same engine for fr and en models', async () => {
    process.env.ENGINE_HOT_KEYS = ''
    const { getEngineForModel } = await import('../engine-registry.service.ts')
    const getEngine = getEngineForModel({ logger: noopLogger })

    const frEngine = await getEngine(model('FR'))
    const enEngine = await getEngine({
      ...model('FR'),
      locale: 'en',
    })
    expect(enEngine).toBe(frEngine)
  })

  it('evicts the least recently used non-hot engine once the cache is full', async () => {
    process.env.ENGINE_HOT_KEYS = ''
    process.env.ENGINE_CACHE_MAX_SIZE = '2'
    const { getEngineForModel } = await import('../engine-registry.service.ts')
    const getEngine = getEngineForModel({ logger: noopLogger })

    const fr = await getEngine(model('FR'))
    await getEngine(model('UK'))
    // Cache is now full (FR, UK); building a third combo evicts FR (least
    // recently used, since UK was accessed after FR).
    await getEngine(model('BE'))

    const frRebuilt = await getEngine(model('FR'))
    expect(frRebuilt).not.toBe(fr)
  })

  it('throws for a model version that is neither current nor previous', async () => {
    const { getEngineForModel } = await import('../engine-registry.service.ts')
    const getEngine = getEngineForModel({ logger: noopLogger })

    await expect(
      getEngine({
        region: 'FR',
        locale: 'fr',
        version: { publishedTag: '0.0.1' },
      })
    ).rejects.toThrow()
  })

  it('logs hot engine warm-up via the injected logger', async () => {
    process.env.ENGINE_HOT_KEYS = 'FR:current'
    const { warmUpHotEngines } = await import('../engine-registry.service.ts')
    const logger = { info: vi.fn(), debug: vi.fn() }

    await warmUpHotEngines({ logger })()

    expect(logger.info).toHaveBeenCalledWith(
      '[engine-registry] warming hot engine',
      expect.objectContaining({ key: 'FR:current' })
    )
    expect(logger.info).toHaveBeenCalledWith(
      '[engine-registry] hot engines warmed',
      expect.objectContaining({ count: 1 })
    )
  })

  it('logs a hot engine hit, a cache miss/build, and the resulting lru size via the injected logger', async () => {
    process.env.ENGINE_HOT_KEYS = 'FR:current'
    process.env.ENGINE_CACHE_MAX_SIZE = '5'
    const { warmUpHotEngines, getEngineForModel } =
      await import('../engine-registry.service.ts')
    const logger = { info: vi.fn(), debug: vi.fn() }

    await warmUpHotEngines({ logger })()
    const getEngine = getEngineForModel({ logger })

    await getEngine(model('FR'))
    expect(logger.debug).toHaveBeenCalledWith(
      '[engine-registry] hot engine hit',
      expect.objectContaining({ key: 'FR:current' })
    )

    await getEngine(model('UK'))
    expect(logger.debug).toHaveBeenCalledWith(
      '[engine-registry] cache miss, building engine',
      expect.objectContaining({ key: 'UK:current' })
    )
    expect(logger.debug).toHaveBeenCalledWith(
      '[engine-registry] engine built',
      expect.objectContaining({ region: 'UK', versionKind: 'current' })
    )
    expect(logger.debug).toHaveBeenCalledWith(
      '[engine-registry] lru cache size',
      expect.objectContaining({ lruSize: 1 })
    )

    await getEngine(model('UK'))
    expect(logger.debug).toHaveBeenCalledWith(
      '[engine-registry] lru cache hit',
      expect.objectContaining({ key: 'UK:current', lruSize: 1 })
    )
  })
})

function model(region: ModelRegion): Model {
  return {
    region,
    locale: 'fr',
    version: { publishedTag: CURRENT_MODEL_VERSION },
  }
}
