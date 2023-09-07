type Props = {
  setUser: any
}
export default function useUserDetails({ setUser }: Props) {
  const updateName = (name: string) =>
    setUser((prevUser: any) => ({ ...prevUser, name }))

  const updateEmail = (email: string) =>
    setUser((prevUser: any) => ({ ...prevUser, email }))

  const updateRegion = (region: { code: string; name: string }) =>
    setUser((prevUser: any) => ({ ...prevUser, region }))

  return { updateName, updateEmail, updateRegion }
}
