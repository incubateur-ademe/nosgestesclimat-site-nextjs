import { safeLocalStorage } from '@/utils/browser/safeLocalStorage'
import { useEffect, useState } from 'react'
import type { Tutorials } from '../../../types'

type Props = {
  storageKey: string
}
export default function usePersistentTutorials({ storageKey }: Props) {
  const [initialized, setInitialized] = useState<boolean>(false)

  const [tutorials, setTutorials] = useState<Tutorials>({})

  useEffect(() => {
    setTutorials(
      JSON.parse(safeLocalStorage.getItem(storageKey) || '{}').tutorials || {}
    )

    setInitialized(true)
  }, [storageKey])

  useEffect(() => {
    if (initialized) {
      const currentStorage = JSON.parse(
        safeLocalStorage.getItem(storageKey) || '{}'
      )
      const updatedStorage = { ...currentStorage, tutorials }
      safeLocalStorage.setItem(storageKey, JSON.stringify(updatedStorage))
    }
  }, [storageKey, tutorials, initialized])

  return { tutorials, setTutorials }
}
