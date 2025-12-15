import { useCurrentSimulation } from '@/publicodes-state'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useInfosPage } from '../navigation/useInfosPage'
import { useSaveSimulation } from '../simulation/useSaveSimulation'

export function useSaveAndGoNext({ curPage }: { curPage: string }) {
  const [shouldSaveAndGoNext, setShouldSaveAndGoNext] = useState(false)
  const [error, setError] = useState(false)

  const { saveSimulation } = useSaveSimulation()

  const currentSimulation = useCurrentSimulation()

  const { getLinkToNextInfosPage } = useInfosPage()

  const router = useRouter()

  useEffect(() => {
    if (shouldSaveAndGoNext) {
      setError(false)

      try {
        saveSimulation({
          simulation: currentSimulation,
        })

        // Go to next page
        router.push(getLinkToNextInfosPage({ curPage }))
      } catch {
        setError(true)
        return
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldSaveAndGoNext])

  return { setShouldSaveAndGoNext, errorSaveSimulation: error }
}
