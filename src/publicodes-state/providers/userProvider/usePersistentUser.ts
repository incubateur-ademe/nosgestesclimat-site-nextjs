import { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { User } from '../../types'

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
    userId: '',
  })

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem(storageKey) || '{}').user ?? {
      region: initialRegion,
      initialRegion,
      userId: uuid(),
    }
    setUser(formatUser({ user }))
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

type NotFormattedUser = Omit<User, 'userId'> & {
  id?: string
  userId?: string
}
// Convert the user id to userId (and remove id if it exists)
function formatUser({ user }: { user: NotFormattedUser }): User {
  if (!user.id) return user as User

  const formattedUser = {
    ...user,
    userId: user.id,
  }

  delete formattedUser.id

  return formattedUser
}
