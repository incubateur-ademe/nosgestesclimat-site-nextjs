import { Dispatch, SetStateAction } from 'react'
import { User, UserOrganisationInfo } from '../../types'

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

  const updateUserOrganisation = (organisation: UserOrganisationInfo) => {
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
      organisation: { ...prevUser.organisation, ...organisationModifications },
    }))
  }

  return {
    updateName,
    updateEmail,
    updateRegion,
    updateLoginExpirationDate,
    updateUserOrganisation,
  }
}
