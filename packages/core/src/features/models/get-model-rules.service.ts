import type { NGCRules } from '@incubateur-ademe/nosgestesclimat'
import type { CaptureException } from '../logger/index.ts'
import { OutdatedModelVersionException } from './exceptions/model-rules.exception.ts'
import { fetchModelFile as defaultFetchModelFile } from './fetch-model-file.ts'
import { getModelFileName } from './get-model-file-name.ts'
import { importCurrentModel as defaultFindCurrentModel } from './import-current-model.ts'
import { getPreviewModelUrl, getPublishedModelUrl } from './model-rules-urls.ts'
import { CURRENT_MODEL_VERSION } from './model-versions.ts'
import type { Model } from './model.ts'

interface GetModelRulesDeps {
  /**
   * Loads the rules for the currently installed model. Defaults to a dynamic
   * import from the `@incubateur-ademe/nosgestesclimat` package; the site
   * overrides it to statically ship the optimized FR rule set in the bundle.
   */
  findCurrentModel?: (fileName: string) => Promise<NGCRules>
  /**
   * Fetches a model file that is not installed locally (a PR preview or an
   * older published version). Defaults to the real implementation; tests
   * override it to avoid hitting the network.
   */
  fetchModelFile?: typeof defaultFetchModelFile
  captureException?: CaptureException
  /**
   * What to do with a published tag other than the installed one.
   * `fetch` (worker) computes against the version the simulation was made
   * with; `fallback_to_current` (site) reports the mismatch and serves the
   * installed rules, because the site migrates situations forward anyway.
   */
  outdatedPublishedTagStrategy?: 'fetch' | 'fallback_to_current'
}

/**
 * Single entry point for retrieving a model's rules, whatever version it
 * points at: the installed package, a published tag on the npm CDN, or a PR
 * preview build.
 */
export function createGetModelRules(deps: GetModelRulesDeps) {
  const {
    findCurrentModel = defaultFindCurrentModel,
    fetchModelFile = defaultFetchModelFile,
    captureException,
    outdatedPublishedTagStrategy = 'fetch',
  } = deps

  return async function getModelRules(
    model: Partial<Model> = {},
    { isOptim = false }: { isOptim?: boolean } = {}
  ): Promise<NGCRules> {
    const {
      region = 'FR',
      locale = 'fr',
      version = { publishedTag: CURRENT_MODEL_VERSION },
    } = model

    const fileName = getModelFileName({ region, locale, isOptim })

    if ('PRNumber' in version) {
      return await fetchModelFile<NGCRules>(
        getPreviewModelUrl(version.PRNumber, fileName)
      )
    }

    if (version.publishedTag === CURRENT_MODEL_VERSION) {
      return await findCurrentModel(fileName)
    }

    if (outdatedPublishedTagStrategy === 'fallback_to_current') {
      captureException?.(
        new OutdatedModelVersionException({
          message: `Model version mismatch: ${version.publishedTag} !== ${CURRENT_MODEL_VERSION}`,
          publishedTag: version.publishedTag,
          currentModelVersion: CURRENT_MODEL_VERSION,
        })
      )
      return await findCurrentModel(fileName)
    }

    return await fetchModelFile<NGCRules>(
      getPublishedModelUrl(version.publishedTag, fileName)
    )
  }
}
