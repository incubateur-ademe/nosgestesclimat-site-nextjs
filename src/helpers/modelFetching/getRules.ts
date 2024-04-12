import { NGCRules } from '@/publicodes-state/types'
import { getFileFromModel } from './getFileFromModel'
import { getSupportedRegions } from './getSupportedRegions'

type Props = {
  isOptim?: boolean
  regionCode?: string
  locale?: string
  PRNumber?: string
}
/*
 * This function is used to get the rules. It is used in the useRules hook and can also be called directly from a server component.
 */
export async function getRules(
  { locale = 'fr', regionCode = 'FR', isOptim = true, PRNumber }: Props = {
    locale: 'fr',
    regionCode: 'FR',
    isOptim: true,
  }
): Promise<NGCRules> {
  const supportedRegions = await getSupportedRegions()

  // We provide the FR version of the model if the region is not supported
  const regionCodeToProvide = supportedRegions[regionCode] ? regionCode : 'FR'

  let fileName = ''

  // We provide optimized version of the model only for the FR region
  const optim = isOptim && regionCodeToProvide === 'FR' ? '-opti' : ''

  fileName = `co2-model.${regionCodeToProvide}-lang.${locale}${optim}.json`

  return getFileFromModel({ fileName, PRNumber })
}
