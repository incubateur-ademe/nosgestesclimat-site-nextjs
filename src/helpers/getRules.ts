import { NGCRules } from '@/publicodes-state/types'

type Props = {
  isOptim?: boolean
  regionCode?: string
  locale?: string
}

export default async function getRules(
  { locale = 'fr', regionCode = 'FR', isOptim = true }: Props = {
    locale: 'fr',
    regionCode: 'FR',
    isOptim: true,
  }
): Promise<NGCRules> {
  if (process.env.NEXT_PUBLIC_LOCAL_DATA === 'nosgestesclimat') {
    const localRules = await importLocalRules({ locale, regionCode, isOptim })
    if (localRules) return localRules
  }

  console.log(
    'importing (but not really)',
    `@incubateur-ademe/nosgestesclimat/${regionCode}/${locale}${
      isOptim ? '/optim' : ''
    }`
  )
  const model = await import(`@incubateur-ademe/nosgestesclimat`)

  return model.default

  // return import(
  // `@incubateur-ademe/nosgestesclimat/${regionCode}/${locale}${
  //   isOptim ? '/optim' : ''
  // }`
  // )
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
