import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export function useVigieEau(): { departements: Record<string, string>[] } {
  const { data: departements } = useQuery({
    queryKey: ['fetch Vigie Eau'],
    queryFn: () =>
      axios
        .get(`https://api.vigieau.beta.gouv.fr/api/departements`)
        .then((res) => res.data)
        .then((departements) =>
          departements.filter(
            (departement: Record<string, string>) =>
              departement.niveauGraviteMax
          )
        ),
    initialData: [],
  })

  return { departements }
}
