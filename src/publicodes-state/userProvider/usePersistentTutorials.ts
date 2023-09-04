import { useEffect, useState } from 'react'

type Props = {
  storageKey: string
}
export default function usePersistentTutorials({ storageKey }: Props) {
  const [initialized, setInitialized] = useState(false)

  const [tutorials, setTutorials] = useState<any>({})

  useEffect(() => {
    setTutorials(
      JSON.parse(localStorage.getItem(storageKey) || '{}').tutorials || {}
    )
    setInitialized(true)
  }, [storageKey])

  useEffect(() => {
    if (initialized) {
      const currentStorage = JSON.parse(
        localStorage.getItem(storageKey) || '{}'
      )
      const updatedStorage = { ...currentStorage, tutorials }
      localStorage.setItem(storageKey, JSON.stringify(updatedStorage))
    }
  }, [storageKey, tutorials, initialized])

  return { tutorials, setTutorials }
}
