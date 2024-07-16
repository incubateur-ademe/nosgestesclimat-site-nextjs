import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

type Props = {
  postalCode: string
}
export function useInseeCode({ postalCode }: Props) {
  const { data: inseeCode, isLoading } = useQuery({
    queryKey: ['fetch INSEE Code', postalCode],
    queryFn: () =>
      axios
        .get(`https://geo.api.gouv.fr/communes?codePostal=${postalCode}`)
        .then((res) => res.data[0].code),
    enabled: postalCode ? true : false,
  })
  return { inseeCode, isLoading }
}
