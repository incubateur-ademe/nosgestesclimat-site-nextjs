import { NGC_MODEL_API_URL, NGC_MODEL_API_URL_FALLBACK } from '@/constants/urls'
import { NGCRules } from '@/publicodes-state/types'

import axios from 'axios'

type Props = {
  dataServer: string
  regionCode: string
  locale: string
  isOptim?: boolean
}

export async function fetchModel({
  dataServer,
  regionCode,
  locale,
  isOptim = true,
}: Props) {
  const URLToFetch = getURLToFetch(dataServer, locale, regionCode, isOptim)

  return axios
    .get(URLToFetch)
    .then((res) => res.data as NGCRules)
    .catch((err) => {
      console.warn(`Failed to fetch rules from: ${URLToFetch}`, err.message)
      const fallbackURL = getURLToFetch(
        NGC_MODEL_API_URL_FALLBACK,
        locale,
        regionCode,
        isOptim
      )
      console.warn(`Falling back to: ${fallbackURL}`)
      return axios.get(fallbackURL).then(({ data }) => data as NGCRules)
    })
}

function getURLToFetch(
  dataServer: string,
  locale: string,
  regionCode: string,
  isOptim: boolean
): string {
  return dataServer.startsWith(NGC_MODEL_API_URL)
    ? `${dataServer}/${locale}/${regionCode}/${
        isOptim ? 'optim-rules' : 'rules'
      }`
    : `${dataServer}/co2-model.${regionCode}-lang.${locale}${
        isOptim ? '-opti' : ''
      }.json`
}
