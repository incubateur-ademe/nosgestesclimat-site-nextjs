import { NGCRules } from '@/publicodes-state/types'

async function importLocalRules({
  regionCode,
  locale,
  isOptim,
}: {
  regionCode?: string
  locale: string
  isOptim: boolean
}) {
  try {
    return (await import(
      `../../../nosgestesclimat/public/co2-model.${regionCode}-lang.${locale}${
        isOptim ? '-opti' : ''
      }.json`
    )) as NGCRules
  } catch (e) {
    console.error(e)
  }
}

export default importLocalRules
