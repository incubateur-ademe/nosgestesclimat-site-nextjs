import { LocalStorage, migrationType } from '@/publicodes-state/types'
import { captureException } from '@sentry/react'
import { useEffect } from 'react'
import filterLocalStorage from './filterLocalStorage'

type Props = {
  storageKey: string
  migrationInstructions: migrationType
}

function handleLocalStorageMigration(
  currentLocalStorage: any,
  storageKey: string,
  migrationInstructions: migrationType
) {
  try {
    const filteredLocalStorage = filterLocalStorage({
      localStorage: currentLocalStorage,
      migrationInstructions,
    })

    localStorage.setItem(storageKey, JSON.stringify(filteredLocalStorage))
  } catch (error) {
    console.warn('Error trying to migrate LocalStorage:', error)
    captureException(error)
  }
}

export default function useUpdateOldLocalStorage({
  storageKey,
  migrationInstructions,
}: Props) {
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
    handleLocalStorageMigration(
      currentLocalStorage,
      storageKey,
      migrationInstructions
    )
  }, [storageKey, migrationInstructions])
}
