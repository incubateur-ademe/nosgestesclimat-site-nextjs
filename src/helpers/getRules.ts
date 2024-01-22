import { getModelPRUrl } from '@/constants/urls'
import { NGCRules } from '@/publicodes-state/types'
import axios from 'axios'

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
  if (process.env.NEXT_PUBLIC_LOCAL_DATA === 'nosgestesclimat') {
    const localRules = await importLocalRules({ locale, regionCode, isOptim })
    if (localRules) return localRules
  }

  if (PRNumber) {
    const previewRules = await importPreviewRules({
      locale,
      regionCode,
      isOptim,
      PRNumber,
    })
    if (previewRules) return previewRules
  }

  const rules = await importRules({ locale, regionCode, isOptim })

  return rules
}

async function importLocalRules({
  regionCode,
  locale,
  isOptim,
}: {
  regionCode?: string
  locale: string
  isOptim: boolean
}) {
  console.log(
    'importing local rules',
    `../../../nosgestesclimat/public/co2-model.${regionCode}-lang.${locale}${
      isOptim ? '-opti' : ''
    }.json`
  )
  try {
    return (await import(
      `@/incubateur-ademe/nosgestesclimat/co2-model.${regionCode}-lang.${locale}${
        isOptim ? '-opti' : ''
      }.json`
    )) as NGCRules
  } catch (e) {
    console.error(e)
    return null
  }
}

async function importPreviewRules({
  regionCode,
  locale,
  isOptim,
  PRNumber,
}: {
  regionCode?: string
  locale: string
  isOptim: boolean
  PRNumber: string
}) {
  const previewURL = getModelPRUrl(PRNumber)
  console.log(
    'importing preview rules',
    `${previewURL}/co2-model.${regionCode}-lang.${locale}${
      isOptim ? '-opti' : ''
    }.json`
  )
  return axios
    .get(
      `${previewURL}/co2-model.${regionCode}-lang.${locale}${
        isOptim ? '-opti' : ''
      }.json`
    )
    .then((res) => res.data as NGCRules)
    .catch((e) => {
      console.error(e)
      return null
    })
}

async function importRules({
  regionCode,
  locale,
  isOptim,
}: {
  regionCode?: string
  locale: string
  isOptim: boolean
}) {
  console.log(
    'importing rules',
    `@/incubateur-ademe/nosgestesclimat/co2-model.${regionCode}-lang.${locale}${
      isOptim ? '-opti' : ''
    }.json`
  )
  try {
    return (await import(
      `@/incubateur-ademe/nosgestesclimat/co2-model.${regionCode}-lang.${locale}${
        isOptim ? '-opti' : ''
      }.json`
    )) as NGCRules
  } catch (e) {
    console.error(e)
    return {}
  }
}
