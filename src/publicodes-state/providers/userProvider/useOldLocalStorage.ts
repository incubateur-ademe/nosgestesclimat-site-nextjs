import { LocalStorage } from '@/publicodes-state/types'
import { useEffect } from 'react'

type Props = {
  storageKey: string
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

    const isCurrentLocalStorageEmpty =
      Object.keys(currentLocalStorage).length === 0

    // We don't import the storage if you have a simulation with a persona because it's too buggy and no one cares
    // We also don't import old localstorage if the current "new" localstorage is not empty
    if (
      oldLocalStorage &&
      !oldLocalStorage.includes('persona') &&
      isCurrentLocalStorageEmpty
    ) {
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          ...objectOldLocalStorage,
          user: {
            ...objectOldLocalStorage.user,
            id: objectOldLocalStorage.user.userId,
          },
        })
      )

      localStorage.removeItem('ecolab-climat::persisted-simulation::v2')
    }
  }, [storageKey])
}
