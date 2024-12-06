import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import dayjs from 'dayjs'

export function useVigieEau(): { departements: Record<string, string>[] } {
  const { data: departements } = useQuery({
    queryKey: ['fetch Vigie Eau'],
    queryFn: () =>
      axios
        .get(
          `https://api.vigieau.beta.gouv.fr/api/departements?date=${dayjs().subtract(1, 'day').format('YYYY-MM-DD')}`
        )
        .then((res) => res.data)
        .then((departements) =>
          departements.filter(
            (departement: Record<string, string>) =>
              departement.niveauGraviteAepMax
          )
        ),
    initialData: [],
  })

  return { departements }
}
