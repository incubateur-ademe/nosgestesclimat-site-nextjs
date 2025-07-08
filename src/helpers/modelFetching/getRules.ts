import i18nConfig from '@/i18nConfig'
import type { NGCRules } from '@incubateur-ademe/nosgestesclimat'
import rulesToTest from '@incubateur-ademe/nosgestesclimat-test/public/co2-model.FR-lang.fr.json'
import rules from '@incubateur-ademe/nosgestesclimat/public/co2-model.FR-lang.fr-opti.json'
import { getSupportedRegions } from './getSupportedRegions'
import { importPreviewFile } from './importPreviewFile'
import { importRulesFromModelEsEnLang } from './importRulesFromModelEsEnLang'
import { importRulesFromModelFrLang } from './importRulesFromModelFrLang'

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

  const fileName = `co2-model.FR-lang.${locale}${isOptim && regionCodeToProvide === 'FR' ? '-opti' : ''}.json`

  if (PRNumber) {
    return importPreviewFile({ fileName, PRNumber })
  }

  if (regionCodeToProvide === 'FR' && locale === 'fr' && isOptim) {
    // We need to cast the rules as Partial<NGCRules> because the rules are optimized rules here (and some rules are voluntarily removed)
    const rulesToBeUsed = ABtesting ? rulesToTest : rules
    return Promise.resolve(rulesToBeUsed as Partial<NGCRules>)
  }

  if (locale === i18nConfig.defaultLocale) {
    return importRulesFromModelFrLang({
      fileName,
      ABtesting,
    })
  } else {
    return importRulesFromModelEsEnLang({
      fileName:
        locale === 'en'
          ? `co2-model.${regionCodeToProvide}-lang.en.json`
          : `co2-model.${regionCodeToProvide}-lang.es.json`,
    })
  }
}
