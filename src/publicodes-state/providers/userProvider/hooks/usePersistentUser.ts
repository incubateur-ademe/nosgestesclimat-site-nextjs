import { safeLocalStorage } from '@/utils/browser/safeLocalStorage'
import { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import type { RegionFromGeolocation, User } from '../../../types'

type Props = {
  storageKey: string
  initialRegion?: RegionFromGeolocation
}
export default function usePersistentUser({
  storageKey,
  initialRegion,
}: Props) {
  const [initialized, setInitialized] = useState<boolean>(false)

  const [user, setUser] = useState<User>({
    region: initialRegion,
    initialRegion: initialRegion,
    userId: uuid(),
  })

  // Update the user region if it is not set and user is not saved in local storage
  useEffect(() => {
    if (initialRegion && !user.region) {
      setUser({
        ...user,
        region: initialRegion,
        initialRegion: initialRegion,
      })
    }
  }, [initialRegion, user])

  // Upon first render, check if there is a user in local storage and format it
  // and save it to the user state
  useEffect(() => {
    const currentStorage = safeLocalStorage.getItem(storageKey)
    const parsedStorage = JSON.parse(currentStorage || '{}')
    const localUser: User | undefined = parsedStorage.user

    if (localUser) {
      setUser(formatUser({ user: localUser }))
    }
    setInitialized(true)
  }, [storageKey])

  // Save the user to local storage after initialization
  useEffect(() => {
    if (initialized) {
      const currentStorage = JSON.parse(
        safeLocalStorage.getItem(storageKey) || '{}'
      )
      const updatedStorage = { ...currentStorage, user }
      safeLocalStorage.setItem(storageKey, JSON.stringify(updatedStorage))
    }
  }, [storageKey, user, initialized])

  return { user, setUser }
}

type NotFormattedUser = Omit<User, 'userId'> & {
  id?: string
  userId?: string
}
// Handle making sure the user object has a userId
function formatUser({ user }: { user: NotFormattedUser }): User {
  const formattedUser = {
    ...user,
    userId: user.userId || user.id || uuid(),
  }

  delete formattedUser.id

  return formattedUser
}
