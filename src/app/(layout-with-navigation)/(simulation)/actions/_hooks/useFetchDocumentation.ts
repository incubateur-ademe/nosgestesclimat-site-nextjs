import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export function useFetchDocumentation(PRNumber?: string) {
  const documentationUrl =
    (PRNumber
      ? `https://deploy-preview-${PRNumber}--ecolab-data.netlify.app`
      : 'https://data.nosgestesclimat.fr') + '/contenu-ecrit.json'

  return useQuery({
    queryKey: ['documentation'],
    queryFn: () =>
      axios.get(documentationUrl).then((response) => response.data),
  })
}
