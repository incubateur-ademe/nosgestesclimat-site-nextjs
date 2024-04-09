import { Dispatch, SetStateAction, useCallback } from 'react'
import { User, UserOrganisationInfo } from '../../types'

type Props = {
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
    (region: { code: string; name: string }) =>
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

      if (organisation.administratorEmail) {
        organisationModifications.administratorEmail =
          organisation.administratorEmail
      }

      if (organisation.slug) {
        organisationModifications.slug = organisation.slug
      }

      if (organisation.name) {
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
