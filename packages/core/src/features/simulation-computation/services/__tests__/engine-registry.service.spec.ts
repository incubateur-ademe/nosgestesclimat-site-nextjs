import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { Model, ModelRegion } from '../../../simulations/types/model.ts'
import { CURRENT_MODEL_VERSION } from '../../model-support/model-versions.ts'

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
    await warmUpHotEngines()

    const engineA = await getEngineForModel(model('FR'))
    const engineB = await getEngineForModel(model('FR'))
    expect(engineA).toBe(engineB)
  })

  it('ignores locale and reuses the same engine for fr and en models', async () => {
    process.env.ENGINE_HOT_KEYS = ''
    const { getEngineForModel } = await import('../engine-registry.service.ts')

    const frEngine = await getEngineForModel(model('FR'))
    const enEngine = await getEngineForModel({
      ...model('FR'),
      locale: 'en',
    })
    expect(enEngine).toBe(frEngine)
  })

  it('evicts the least recently used non-hot engine once the cache is full', async () => {
    process.env.ENGINE_HOT_KEYS = ''
    process.env.ENGINE_CACHE_MAX_SIZE = '2'
    const { getEngineForModel } = await import('../engine-registry.service.ts')

    const fr = await getEngineForModel(model('FR'))
    await getEngineForModel(model('UK'))
    // Cache is now full (FR, UK); building a third combo evicts FR (least
    // recently used, since UK was accessed after FR).
    await getEngineForModel(model('BE'))

    const frRebuilt = await getEngineForModel(model('FR'))
    expect(frRebuilt).not.toBe(fr)
  })

  it('throws for a model version that is neither current nor previous', async () => {
    const { getEngineForModel } = await import('../engine-registry.service.ts')

    await expect(
      getEngineForModel({
        region: 'FR',
        locale: 'fr',
        version: { publishedTag: '0.0.1' },
      })
    ).rejects.toThrow()
  })
})

function model(region: ModelRegion): Model {
  return {
    region,
    locale: 'fr',
    version: { publishedTag: CURRENT_MODEL_VERSION },
  }
}
