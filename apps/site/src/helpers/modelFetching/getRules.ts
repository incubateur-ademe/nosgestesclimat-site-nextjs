import type { NGCRules } from '@incubateur-ademe/nosgestesclimat'
import rulesOpti from '@incubateur-ademe/nosgestesclimat/public/co2-model.FR-lang.fr-opti.json'

import { getModelFileName } from '@nosgestesclimat/core/features/models/helpers/get-model-file-name'
import { importCurrentModel } from '@nosgestesclimat/core/features/models/helpers/import-current-model'
import { createGetModelRules } from '@nosgestesclimat/core/features/models/services/get-model-rules.service'
import { captureException } from '@sentry/nextjs'
import { CURRENT_MODEL_VERSION, type Model } from '../server/model/models'

const getModelRules = createGetModelRules({
  findCurrentModel,
  captureException,
  // The site migrates outdated situations forward to the current model
  // (see migrateSimulationIfNeeded), so it keeps rendering the installed rules
  // and only reports the mismatch. The worker is the one fetching old versions.
  outdatedPublishedTagStrategy: 'fallback_to_current',
})

interface Props extends Model {
  isOptim?: boolean
}

/*
 * This function is used to get the rules. It is used in the useRules hook and can also be called directly from a server component.
 */
export async function getRules({
  isOptim = true,
  region = 'FR',
  locale = 'fr',
  version = {
    publishedTag: CURRENT_MODEL_VERSION,
  },
}: Partial<Props> = {}): Promise<NGCRules> {
  const result = await getModelRules({ region, locale, version }, { isOptim })
  if (!result.success) {
    throw result.error
  }
  return result.data
}

const FR_FR_OPTI_FILENAME = getModelFileName({
  region: 'FR',
  locale: 'fr',
  isOptim: true,
})

async function findCurrentModel(fileName: string): Promise<NGCRules> {
  if (fileName === FR_FR_OPTI_FILENAME) {
    // Statically imported so the optimized rules ship in the bundle instead of
    // being fetched. They are a subset of the model - some rules are
    // voluntarily removed - so we accept to loose some type soundness here for
    // increased code clarity.
    return rulesOpti as unknown as NGCRules
  }

  try {
    return await importCurrentModel(fileName)
  } catch (e) {
    captureException(e)
    return {} as NGCRules
  }
}
