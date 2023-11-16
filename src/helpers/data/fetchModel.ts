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
  isOptim,
}: Props) {
  return axios
    .get(
      `${dataServer}/co2-model.${regionCode}-lang.${locale}${
        isOptim ? '-opti' : ''
      }.json`
    )
    .then((res) => res.data as unknown)
}
