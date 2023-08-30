import { useEffect, useState } from 'react'

type Props = {
  storageKey: string
  initialRegion: { code: string; name: string }
}
export default function usePersistentUser({
  storageKey,
  initialRegion,
}: Props) {
  const [initialized, setInitialized] = useState(false)

  const [user, setUser] = useState<any>({})

  useEffect(() => {
    setUser(
      JSON.parse(localStorage.getItem(storageKey) || '{}').user || {
        region: initialRegion,
        initialRegion,
      }
    )

    setInitialized(true)
  }, [storageKey])

  useEffect(() => {
    if (initialized) {
      const currentStorage = JSON.parse(
        localStorage.getItem(storageKey) || '{}'
      )
      const updatedStorage = { ...currentStorage, user }
      localStorage.setItem(storageKey, JSON.stringify(updatedStorage))
    }
  }, [storageKey, user, initialized])

  return { user, setUser }
}
