import { User } from '../types'

type Props = {
  setUser: (user: User | ((prevUser: User) => void)) => void
}
export default function useUserDetails({ setUser }: Props) {
  const updateName = (name: string) =>
    setUser((prevUser: User) => ({ ...prevUser, name }))

  const updateEmail = (email: string) =>
    setUser((prevUser: User) => ({ ...prevUser, email }))

  const updateRegion = (region: { code: string; name: string }) =>
    setUser((prevUser: User) => ({ ...prevUser, region }))

  return { updateName, updateEmail, updateRegion }
}
