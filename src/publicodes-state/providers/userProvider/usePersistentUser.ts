import countries from '@/app/api/geolocation/countries.json'
import { getIsLocalStorageAvailable } from '@/utils/getIsLocalStorageAvailable'
import { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { User } from '../../types'

const isLocalStorageAvailable = getIsLocalStorageAvailable()

type Props = {
  storageKey: string
  initialRegionCode: string
}
export default function usePersistentUser({
  storageKey,
  initialRegionCode,
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
    let localUser: User | undefined
    if (isLocalStorageAvailable) {
      const currentStorage = localStorage.getItem(storageKey)
      const parsedStorage = JSON.parse(currentStorage || '{}')
      localUser = parsedStorage.user
    }
    if (localUser) {
      setUser(formatUser({ user: localUser }))
    } else {
      const initialRegion = countries.find(
        (country) => country.code === initialRegionCode
      ) ?? {
        code: 'FR',
        name: 'France',
      }
      setUser({
        region: initialRegion,
        initialRegion,
        userId: uuid(),
      })
    }
    setInitialized(true)
  }, [storageKey, initialRegionCode])

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
