import { STORAGE_KEY } from '@/constants/storage'
import { safeLocalStorage } from '@/utils/browser/safeLocalStorage'
import { useEffect, useState } from 'react'
import type { Tutorials } from '../../../types'

export default function usePersistentTutorials() {
  const [initialized, setInitialized] = useState<boolean>(false)

  const [tutorials, setTutorials] = useState<Tutorials>({})

  useEffect(() => {
    setTutorials(
      JSON.parse(safeLocalStorage.getItem(STORAGE_KEY) || '{}').tutorials || {}
    )

    setInitialized(true)
  }, [])

  useEffect(() => {
    if (initialized) {
      const currentStorage = JSON.parse(
        safeLocalStorage.getItem(STORAGE_KEY) || '{}'
      )
      const updatedStorage = { ...currentStorage, tutorials }
      safeLocalStorage.setItem(STORAGE_KEY, JSON.stringify(updatedStorage))
    }
  }, [tutorials, initialized])

  return { tutorials, setTutorials }
}
