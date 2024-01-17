import { LocalStorage } from '@/publicodes-state/types'
import { captureException } from '@sentry/react'
import { useEffect } from 'react'
import filterLocalStorage from './filterLocalStorage'

type Props = {
  storageKey: string
}

function handleLocalStorageMigration(
  currentLocalStorage: any,
  storageKey: string
) {
  try {
    const filteredLocalStorage = filterLocalStorage(currentLocalStorage)

    localStorage.setItem(storageKey, JSON.stringify(filteredLocalStorage))
  } catch (error) {
    console.warn('Error trying to migrate LocalStorage:', error)
    captureException(error)
  }
}

export default function useUpdateOldLocalStorage({ storageKey }: Props) {
  useEffect(() => {
    const oldLocalStorage = localStorage.getItem(
      'ecolab-climat::persisted-simulation::v2'
    )
    const currentLocalStorage: LocalStorage = JSON.parse(
      localStorage.getItem(storageKey) || '{}'
    )
    const objectOldLocalStorage = JSON.parse(oldLocalStorage || '{}')

    // We don't import the storage if you have a simulation with a persona because it's too buggy and no one cares
    if (
      oldLocalStorage &&
      !oldLocalStorage.includes('persona') &&
      !currentLocalStorage
    ) {
      localStorage.setItem(storageKey, {
        ...objectOldLocalStorage,
        user: {
          ...objectOldLocalStorage.user,
          id: objectOldLocalStorage.user.userId,
        },
      })

      localStorage.removeItem('ecolab-climat::persisted-simulation::v2')
    }

    // We migrate rules according to `dottedNamesMigration` table
    handleLocalStorageMigration(currentLocalStorage, storageKey)
  }, [storageKey])
}
