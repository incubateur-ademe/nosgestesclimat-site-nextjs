import { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { User } from '../types'

type Props = {
  storageKey: string
  initialRegion: { code: string; name: string }
}
export default function usePersistentUser({
  storageKey,
  initialRegion,
}: Props) {
  const [initialized, setInitialized] = useState<boolean>(false)

  const [user, setUser] = useState<User>({
    region: {
      code: '',
      name: '',
    },
    initialRegion: {
      code: '',
      name: '',
    },
    name: '',
    email: '',
    id: uuid(),
  })

  useEffect(() => {
    setUser(
      JSON.parse(localStorage.getItem(storageKey) || '{}').user || {
        region: initialRegion,
        initialRegion,
      }
    )
    setInitialized(true)
  }, [storageKey, initialRegion])

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
