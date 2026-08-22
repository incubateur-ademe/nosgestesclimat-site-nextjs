import currentPkg from '@incubateur-ademe/nosgestesclimat/package.json' with { type: 'json' }
import type {
  Model,
  ModelLocale,
  ModelRegion,
  ModelVersion,
} from '../types/model.ts'

/**
 * The version portion of a serialized model string, e.g. `4.14.5` or
 * `pr-1234`. The same notation keys the worker engine cache and the
 * `ENGINE_HOT_KEYS` entries.
 */
export type ModelVersionString = string & { __brand: 'ModelVersionString' }

/**
 * The full serialized model, e.g. `FR-fr-4.14.5` or `FR-fr-pr-1234`. Stored in
 * the `Simulation.model` database column.
 */
export type ModelString = string & { __brand: 'ModelString' }

/**
 * Version of the model package installed in node_modules. Every other version
 * a simulation may reference is retrieved over the network.
 */
export const CURRENT_MODEL_VERSION = currentPkg.version as ModelVersionString

const PUBLISHED_TAG_RE = /^\d+\.\d+\.\d+(-[\w.]+)?$/
const PR_VERSION_RE = /^pr-(.+)$/

export const parseModelVersionString = (
  modelVersionString: string
): ModelVersion | null => {
  if (PUBLISHED_TAG_RE.test(modelVersionString)) {
    return { publishedTag: modelVersionString }
  }

  const prMatch = modelVersionString.match(PR_VERSION_RE)
  return prMatch ? { PRNumber: prMatch[1] } : null
}

export const serializeModelVersionString = (
  version: ModelVersion
): ModelVersionString =>
  ('publishedTag' in version
    ? version.publishedTag
    : `pr-${version.PRNumber}`) as ModelVersionString

const MODEL_STRING_RE = /^([A-Z]+)-(fr|en)-(.+)$/

export const parseModelString = (modelString: string): Model | null => {
  const match = modelString.match(MODEL_STRING_RE)
  if (!match) return null

  const [, region, locale, versionRef] = match

  const version = parseModelVersionString(versionRef)
  if (!version) return null

  return {
    region: region as ModelRegion,
    locale: locale as ModelLocale,
    version,
  }
}

export const serializeModelString = (model: Model): ModelString =>
  `${model.region}-${model.locale}-${serializeModelVersionString(model.version)}` as ModelString
