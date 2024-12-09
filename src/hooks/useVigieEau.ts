import { captureException } from '@sentry/nextjs'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import dayjs from 'dayjs'
import { useEffect } from 'react'

export function useVigieEau(): {
  departements: Record<string, string>[]
  error: Error | null
} {
  const { data: departements, error } = useQuery({
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

  useEffect(() => {
    if (error) {
      captureException(error)
    }
  }, [error])

  return { departements, error }
}
