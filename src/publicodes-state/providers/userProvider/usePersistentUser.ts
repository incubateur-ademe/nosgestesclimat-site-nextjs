import { defaultInitialRegion } from '@/constants/defaultRegion'
import { getIsLocalStorageAvailable } from '@/utils/getIsLocalStorageAvailable'
import { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { User } from '../../types'

const isLocalStorageAvailable = getIsLocalStorageAvailable()

// We initialize the user with France as a default region. We then update it with the user's geolocation

type Props = {
  storageKey: string
}
export default function usePersistentUser({ storageKey }: Props) {
  const [initialized, setInitialized] = useState<boolean>(false)

  const [user, setUser] = useState<User>({
    region: defaultInitialRegion,
    initialRegion: defaultInitialRegion,
    userId: uuid(),
  })

  useEffect(() => {
    let localUser: User | undefined
    if (isLocalStorageAvailable) {
      const currentStorage = localStorage.getItem(storageKey)
      const parsedStorage = JSON.parse(currentStorage || '{}')
      localUser = parsedStorage.user
    }
    if (localUser) {
      setUser(formatUser({ user: localUser }))
    }
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
