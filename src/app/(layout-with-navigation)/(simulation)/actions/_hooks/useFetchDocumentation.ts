import { NGC_MODEL_API_URL } from '@/constants/urls'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export function useFetchDocumentation(PRNumber?: string) {
  // TODO : fix the PRNumber logic using the vercel preview url
  const documentationUrl =
    (PRNumber
      ? `https://deploy-preview-${PRNumber}--ecolab-data.netlify.app`
      : // TODO: the documentation is now available from the source code
        NGC_MODEL_API_URL) + '/contenu-ecrit.json'

  return useQuery({
    queryKey: ['documentation'],
    queryFn: () =>
      axios.get(documentationUrl).then((response) => response.data),
  })
}
