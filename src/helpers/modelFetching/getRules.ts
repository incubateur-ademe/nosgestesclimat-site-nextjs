import { NGCRules } from '@incubateur-ademe/nosgestesclimat'
import rules from '@incubateur-ademe/nosgestesclimat/public/co2-model.FR-lang.fr-opti.json'
import { getSupportedRegions } from './getSupportedRegions'
import { importPreviewFile } from './importPreviewFile'
import { importRulesFromModel } from './importRulesFromModel'

type Props = {
  isOptim?: boolean
  regionCode?: string
  locale?: string
  PRNumber?: string
}
const defaultProps = {
  isOptim: true,
  regionCode: 'FR',
  locale: 'fr',
}
/*
 * This function is used to get the rules. It is used in the useRules hook and can also be called directly from a server component.
 */
export async function getRules({
  isOptim = true,
  regionCode = 'FR',
  locale = 'fr',
  PRNumber,
}: Props = defaultProps): Promise<NGCRules> {
  const supportedRegions = await getSupportedRegions()

  // We provide the FR version of the model if the region is not supported
  const regionCodeToProvide = supportedRegions[regionCode] ? regionCode : 'FR'

  let fileName = ''
  // We provide optimized version of the model only for the FR region
  if (regionCodeToProvide === 'FR') {
    fileName = `co2-model.FR-lang.${locale}${isOptim ? '-opti' : ''}.json`
  } else {
    fileName = `co2-model.${regionCodeToProvide}-lang.${locale}.json`
  }

  if (PRNumber) {
    return importPreviewFile({ fileName, PRNumber })
  }

  if (regionCodeToProvide === 'FR' && locale === 'fr' && isOptim) {
    return Promise.resolve(rules as unknown as NGCRules)
  }

  return importRulesFromModel({ fileName })
}
