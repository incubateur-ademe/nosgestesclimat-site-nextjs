import type { NGCRules } from '@incubateur-ademe/nosgestesclimat'
// import rulesToTestOpti from '@incubateur-ademe/nosgestesclimat-test/public/co2-model.FR-lang.fr-opti.json'
// import rulesToTest from '@incubateur-ademe/nosgestesclimat-test/public/co2-model.FR-lang.fr.json'
import rulesOpti from '@incubateur-ademe/nosgestesclimat/public/co2-model.FR-lang.fr-opti.json'
import rules from '@incubateur-ademe/nosgestesclimat/public/co2-model.FR-lang.fr.json'
import { getSupportedRegions } from './getSupportedRegions'
import { importPreviewFile } from './importPreviewFile'
import { importRulesFromModel } from './importRulesFromModel'

type Props = {
  isOptim?: boolean
  regionCode?: string
  locale?: string
  PRNumber?: string
  ABtesting?: boolean
}

export const defaultProps = {
  isOptim: true,
  regionCode: 'FR',
  locale: 'fr',
  ABtesting: false,
}

/*
 * This function is used to get the rules. It is used in the useRules hook and can also be called directly from a server component.
 */
export async function getRules({
  isOptim = true,
  regionCode = 'FR',
  locale = 'fr',
  PRNumber,
  ABtesting = false,
}: Props = defaultProps): Promise<Partial<NGCRules>> {
  const supportedRegions = getSupportedRegions()

  // We provide the FR version of the model if the region is not supported
  const regionCodeToProvide = supportedRegions[regionCode] ? regionCode : 'FR'

  console.log(
    `Getting rules with parameters: isOptim=${isOptim}, regionCode=${regionCodeToProvide}, locale=${locale}, PRNumber=${PRNumber}, ABtesting=${ABtesting}`
  )

  let fileName = ''

  if (PRNumber) {
    if (regionCodeToProvide === 'FR') {
      fileName = `co2-model.FR-lang.${locale}${isOptim ? '-opti' : ''}.json`
    } else {
      fileName = `co2-model.${regionCodeToProvide}-lang.${locale}.json`
    }
    return importPreviewFile({ fileName, PRNumber })
  }

  // If the region is FR and the locale is fr, we use the rules from the test or the main model
  if (regionCodeToProvide === 'FR' && locale === 'fr') {
    // We need to cast the rules as Partial<NGCRules> because the rules are optimized rules here (and some rules are voluntarily removed)
    const rulesToBeUsed = ABtesting
      ? isOptim
        ? // Replace those with the rulesToTestOpti and rulesToTest when AB testing is needed
          rulesOpti
        : rules
      : isOptim
        ? rulesOpti
        : rules
    return Promise.resolve(rulesToBeUsed as Partial<NGCRules>)
  } else {
    switch (locale) {
      case 'en':
        fileName = `co2-model.${regionCodeToProvide}-lang.en.json`
        break
      case 'fr':
      default:
        fileName = `co2-model.${regionCodeToProvide}-lang.fr.json`
        break
    }

    return importRulesFromModel({
      fileName,
    })
  }
}
