import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

type Props = {
  inseeCode: string | null
}
export function useVigieEau({ inseeCode }: Props) {
  return useQuery({
    queryKey: ['fetch Vigie Eau', inseeCode],
    queryFn: () =>
      axios
        .get(
          `https://api.vigieau.gouv.fr/api/zones?commune=${inseeCode}&profil=particulier`
        )
        .then((res) => res.data),
    enabled: inseeCode ? true : false,
  })
}
