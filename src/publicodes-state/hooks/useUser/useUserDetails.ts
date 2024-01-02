import { Dispatch, SetStateAction } from 'react'
import { User } from '../../types'

type Props = {
  setUser: Dispatch<SetStateAction<User>>
}
export default function useUserDetails({ setUser }: Props) {
  const updateName = (name: string) =>
    setUser((prevUser: User) => ({ ...prevUser, name }))

  const updateEmail = (email: string) =>
    setUser((prevUser: User) => ({ ...prevUser, email }))

  const updateRegion = (region: { code: string; name: string }) =>
    setUser((prevUser: User) => ({ ...prevUser, region }))

  const updateLoginExpirationDate = (loginExpirationDate: Date | undefined) =>
    setUser((prevUser: User) => ({ ...prevUser, loginExpirationDate }))

  return { updateName, updateEmail, updateRegion, updateLoginExpirationDate }
}
