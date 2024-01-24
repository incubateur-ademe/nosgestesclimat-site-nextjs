import { NGCRules } from '@/publicodes-state/types'
import fetchFileFromModel from './getFileFromModel'

type Props = {
  isOptim?: boolean
  regionCode?: string
  locale?: string
  PRNumber?: string
}

export default async function getRules(
  { locale = 'fr', regionCode = 'FR', isOptim = true, PRNumber }: Props = {
    locale: 'fr',
    regionCode: 'FR',
    isOptim: true,
  }
): Promise<NGCRules> {
  const fileName = `co2-model.${regionCode}-lang.${locale}${
    isOptim ? '-opti' : ''
  }.json`

  return fetchFileFromModel({ fileName, PRNumber })
}
