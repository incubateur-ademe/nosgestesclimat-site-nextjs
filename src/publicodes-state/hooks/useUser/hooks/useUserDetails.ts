import type {
  RegionFromGeolocation,
  User,
  UserOrganisationInfo,
} from '@/publicodes-state/types'
import type { AuthenticationMode } from '@/types/authentication'
import type { Dispatch, SetStateAction } from 'react'
import { useCallback } from 'react'

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

  const updateInitialRegion = useCallback(
    (initialRegion: RegionFromGeolocation) =>
      setUser((prevUser: User) => ({ ...prevUser, initialRegion })),
    [setUser]
  )

  const updateVerificationCodeExpirationDate = useCallback(
    (verificationCodeExpirationDate: Date | undefined) =>
      setUser((prevUser: User) => ({
        ...prevUser,
        verificationCodeExpirationDate,
      })),
    [setUser]
  )

  const updateAuthenticationMode = useCallback(
    (authenticationMode: AuthenticationMode | undefined) =>
      setUser((prevUser: User) => ({ ...prevUser, authenticationMode })),
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
    updateInitialRegion,
    updateVerificationCodeExpirationDate,
    updateAuthenticationMode,
    updateUserOrganisation,
  }
}
