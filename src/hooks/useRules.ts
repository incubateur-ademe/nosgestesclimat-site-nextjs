import { useUser } from '@/publicodes-state'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useDataServer } from './useDataServer'
import { useLocale } from './useLocale'

type Props = {
  lang?: string
  region?: string
  isOptim?: boolean
}

export function useRules({ lang, region, isOptim = true }: Props) {
  const dataServer = useDataServer()

  const locale = useLocale()

  const { user } = useUser()

  const regionCode =
    user?.region?.code != undefined && user?.region?.code !== ''
      ? user?.region?.code
      : region

  return useQuery(
    ['rules', dataServer, lang, region, isOptim],
    () =>
      process.env.NEXT_PUBLIC_LOCAL_DATA
        ? importLocalRules({ regionCode, locale, isOptim })
        : axios
            .get(
              `${dataServer}/co2-model.${regionCode}-lang.${locale}${
                isOptim ? '-opti' : ''
              }.json`
            )
            .then((res) => res.data as unknown),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  )
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
    return await import(
      `../../../nosgestesclimat/public/co2-model.${regionCode}-lang.${locale}${
        isOptim ? '-opti' : ''
      }.json`
    )
  } catch (e) {
    console.log(e)
  }
}
