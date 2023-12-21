import { useEffect } from 'react'

type Props = {
  storageKey: string
}
export default function useUpdateOldLocalStorage({ storageKey }: Props) {
  useEffect(() => {
    const oldLocalStorage = localStorage.getItem(
      'ecolab-climat::persisted-simulation::v2'
    )

    const currentLocalStorage = localStorage.getItem(storageKey)

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
  }, [storageKey])
}
