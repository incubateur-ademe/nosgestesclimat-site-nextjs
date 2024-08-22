import { Dispatch, SetStateAction, useCallback } from 'react'
import { RegionFromGeolocation, User, UserOrganisationInfo } from '../../types'

type Props = {
  user: User
  setUser: Dispatch<SetStateAction<User>>
}
export default function useUserDetails({ setUser }: Props) {
  const updateName = useCallback(
    (name: string) => setUser((prevUser: User) => ({ ...prevUser, name })),
    [setUser]
  )

  const updateEmail = useCallback(
    (email: string) => setUser((prevUser: User) => ({ ...prevUser, email })),
    [setUser]
  )

  const updateRegion = useCallback(
    (region: RegionFromGeolocation) =>
      setUser((prevUser: User) => ({ ...prevUser, region })),
    [setUser]
  )

  const updateLoginExpirationDate = useCallback(
    (loginExpirationDate: Date | undefined) =>
      setUser((prevUser: User) => ({ ...prevUser, loginExpirationDate })),
    [setUser]
  )

  const updateUserOrganisation = useCallback(
    (organisation: UserOrganisationInfo) => {
      const organisationModifications: UserOrganisationInfo = {}

      if (organisation.administratorEmail !== undefined) {
        organisationModifications.administratorEmail =
          organisation.administratorEmail
      }

      if (organisation.slug !== undefined) {
        organisationModifications.slug = organisation.slug
      }

      if (organisation.name !== undefined) {
        organisationModifications.name = organisation.name
      }

      setUser((prevUser: User) => ({
        ...prevUser,
        organisation: {
          ...prevUser.organisation,
          ...organisationModifications,
        },
      }))
    },
    [setUser]
  )

  return {
    updateName,
    updateEmail,
    updateRegion,
    updateLoginExpirationDate,
    updateUserOrganisation,
  }
}
