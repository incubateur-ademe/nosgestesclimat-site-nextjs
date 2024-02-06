import { NGCRules } from '@/publicodes-state/types'
import {
  UseQueryResult,
  keepPreviousData,
  useQuery,
} from '@tanstack/react-query'
import axios from 'axios'

type Props = {
  search?: number
}

export function usePostalCode({
  search,
}: Props): UseQueryResult<NGCRules, Error> {
  return useQuery({
    queryKey: ['postalCode', search],
    queryFn: () => {
      axios.get(
        `https://geo.api.gouv.fr/communes?codePostal=${search}&fields=code,nom`
      )
    },
    enabled: search !== undefined,
    placeholderData: keepPreviousData,
  })
}
