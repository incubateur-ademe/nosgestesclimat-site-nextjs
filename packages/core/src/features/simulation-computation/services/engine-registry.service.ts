import type { RawPublicodes } from 'publicodes'
import Engine from 'publicodes'
import { match } from 'ts-pattern'
import * as v from 'valibot'
import type { Model, ModelRegion } from '../../simulations/types/model.ts'
import { UnsupportedModelException } from '../exceptions/simulation-computation.exception.ts'
import type { HotKey } from '../model-support/hot-key.schema.ts'
import { HotKeySchema } from '../model-support/hot-key.schema.ts'
import type { ModelVersionKind } from '../model-support/model-versions.ts'
import { resolveVersionKind } from '../model-support/resolve-version-kind.ts'

const ENGINE_OPTIONS = {
  strict: { situation: false, noOrphanRule: false },
  logger: {
    log: () => {},
    warn: () => {},
    error: console.error,
  },
} as const

/**
 * Combinations kept warm at all times, built eagerly by warmUpHotEngines()
 * and never evicted. Comma-separated `<region>:<versionKind>` keys.
 * Defaults to the busiest combination only (~205MB total RSS with worker
 * deps included - see MAX_CACHE_SIZE below), which is what a 256MB review
 * app container can safely hold. Production overrides this via env var to
 * also warm ED:current, on a bigger container.
 */
const HOT_KEYS = new Map<string, HotKey>(
  (process.env.ENGINE_HOT_KEYS ?? 'FR:current')
    .split(',')
    .map((key) => key.trim())
    .filter(Boolean)
    .map((key) => v.parse(HotKeySchema, key))
    .map((hotKey) => [engineKey(hotKey.region, hotKey.versionKind), hotKey])
)

/**
 * Max number of non-hot engines kept in the LRU cache at once. Defaults to
 * 0 (no cache, hot set only) so a container only sized for the hot set never
 * OOMs on a burst of rare region/version requests. Production should
 * raise this via env once its container is sized for it.
 *
 * Measured (see apps/site/scripts/memory-usage/), RSS deltas, not a flat
 * per-engine cost: worker deps loaded but no engine ~110MB; +FR ~95MB
 * (first engine also pays a one-time publicodes/V8 warmup cost); +ED
 * ~20-60MB; a small region (e.g. UK) ~15-25MB. A single FR:current hot
 * engine alone already sits close to 256MB total RSS.
 */
const MAX_CACHE_SIZE = Number(process.env.ENGINE_CACHE_MAX_SIZE) || 0

const hotEngines = new Map<string, Engine>()
// Map preserves insertion order; re-inserting a key on access moves it to
// the end, so the first key is always the least recently used one.
const lruCache = new Map<string, Engine>()

/**
 * Rule sets are only published in French, and locale does not affect
 * computed values (only rule labels do) so every engine is built from the
 * fr rules regardless of the simulation's own locale.
 *
 * Prefer almost hardcoded dynamic imports in case we move to bundling
 */
async function loadRules(
  region: ModelRegion,
  versionKind: ModelVersionKind
): Promise<RawPublicodes<string>> {
  const importModel = match(versionKind)
    .with(
      'current',
      () => () =>
        import(
          `@incubateur-ademe/nosgestesclimat/public/co2-model.${region}-lang.fr.json`,
          {
            with: { type: 'json' },
          }
        )
    )
    .with(
      'previous',
      () => () =>
        import(
          `@incubateur-ademe/nosgestesclimat-previous/public/co2-model.${region}-lang.fr.json`,
          {
            with: { type: 'json' },
          }
        )
    )
    .exhaustive()

  const module = await importModel()
  return module.default
}

async function buildEngine(
  region: ModelRegion,
  versionKind: ModelVersionKind
): Promise<Engine> {
  const rules = await loadRules(region, versionKind)
  return new Engine(rules, ENGINE_OPTIONS)
}

/**
 * Builds and pins the hot-set engines so the first jobs for the busiest
 * combinations never pay the cold-build cost. Call once at worker startup.
 */
export async function warmUpHotEngines(): Promise<void> {
  for (const [key, { region, versionKind }] of HOT_KEYS) {
    hotEngines.set(key, await buildEngine(region, versionKind))
  }
}

/**
 * Returns the engine for a simulation's model, pulling from the hot set,
 * then the LRU cache, then lazily building (and caching) a new one.
 */
export async function getEngineForModel(model: Model): Promise<Engine> {
  const versionKind = resolveVersionKind(model)
  if (versionKind === null) {
    throw new UnsupportedModelException({ model })
  }

  const key = engineKey(model.region, versionKind)

  const hotEngine = hotEngines.get(key)
  if (hotEngine) {
    return hotEngine
  }

  const cachedEngine = lruCache.get(key)
  if (cachedEngine) {
    // Refresh recency by moving the entry to the end.
    lruCache.delete(key)
    lruCache.set(key, cachedEngine)
    return cachedEngine
  }

  const engine = await buildEngine(model.region, versionKind)

  if (lruCache.size >= MAX_CACHE_SIZE) {
    const leastRecentlyUsedKey = lruCache.keys().next().value
    if (leastRecentlyUsedKey) {
      lruCache.delete(leastRecentlyUsedKey)
    }
  }
  lruCache.set(key, engine)

  return engine
}

function engineKey(region: ModelRegion, versionKind: ModelVersionKind): string {
  return `${region}:${versionKind}`
}
