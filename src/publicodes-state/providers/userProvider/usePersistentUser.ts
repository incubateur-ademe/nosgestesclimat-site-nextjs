import { getIsLocalStorageAvailable } from '@/utils/getIsLocalStorageAvailable'
import { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { RegionFromGeolocation, User } from '../../types'

const isLocalStorageAvailable = getIsLocalStorageAvailable()

type Props = {
  storageKey: string
  initialRegion: RegionFromGeolocation
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
    userId: '',
  })

  useEffect(() => {
    console.log('usePersistentUser')
    let localUser: User | undefined
    if (isLocalStorageAvailable) {
      const currentStorage = localStorage.getItem(storageKey)
      const parsedStorage = JSON.parse(currentStorage || '{}')
      localUser = parsedStorage.user
    }
    if (localUser) {
      setUser(formatUser({ user: localUser }))
    } else {
      setUser({
        region: initialRegion,
        initialRegion,
        userId: uuid(),
      })
    }
    setInitialized(true)
  }, [storageKey, initialRegion])

  useEffect(() => {
    console.log('usePersistentUser 2')
    if (initialized) {
      const currentStorage = JSON.parse(
        localStorage.getItem(storageKey) || '{}'
      )
      const updatedStorage = { ...currentStorage, user }
      localStorage.setItem(storageKey, JSON.stringify(updatedStorage))
    }
  }, [storageKey, user, initialized])

  useEffect(() => {
    console.log('update storageKey')
  }, [storageKey])

  useEffect(() => {
    console.log('update initialRegion')
  }, [initialRegion])

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
