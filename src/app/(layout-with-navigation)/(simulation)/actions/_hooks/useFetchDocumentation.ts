import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export function useFetchDocumentation(PRNumber?: string) {
  // TODO : fix the PRNumber logic using the vercel preview url
  const documentationUrl =
    (PRNumber
      ? `https://deploy-preview-${PRNumber}--ecolab-data.netlify.app`
      : 'https://deploy-preview-2085--ecolab-data.netlify.app') +
    '/contenu-ecrit.json'

  return useQuery({
    queryKey: ['documentation'],
    queryFn: () =>
      axios.get(documentationUrl).then((response) => response.data),
  })
}
