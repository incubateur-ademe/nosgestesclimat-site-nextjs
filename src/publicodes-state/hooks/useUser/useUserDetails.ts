import { Dispatch, SetStateAction, useEffect, useRef } from 'react'
import { RegionFromGeolocation, User, UserOrganisationInfo } from '../../types'

type Props = {
  user: User
  setUser: Dispatch<SetStateAction<User>>
}
export default function useUserDetails({ user, setUser }: Props) {
  // This is a hack to return a promise when updating the simulations
  const resolveFunction: any = useRef(null)
  useEffect(() => {
    if (resolveFunction.current) {
      resolveFunction.current()
      resolveFunction.current = null
    }
  }, [user])

  const updateName = (name: string): Promise<void> =>
    new Promise((resolve) => {
      resolveFunction.current = resolve
      setUser((prevUser: User) => ({ ...prevUser, name }))
    })

  const updateEmail = (email: string): Promise<void> =>
    new Promise((resolve) => {
      resolveFunction.current = resolve
      setUser((prevUser: User) => ({ ...prevUser, email }))
    })

  const updateRegion = (region: RegionFromGeolocation): Promise<void> =>
    new Promise((resolve) => {
      resolveFunction.current = resolve
      setUser((prevUser: User) => ({ ...prevUser, region }))
    })

  const updateLoginExpirationDate = (
    loginExpirationDate: Date | undefined
  ): Promise<void> =>
    new Promise((resolve) => {
      resolveFunction.current = resolve
      setUser((prevUser: User) => ({ ...prevUser, loginExpirationDate }))
    })

  const updateUserOrganisation = (
    organisation: UserOrganisationInfo
  ): Promise<void> =>
    new Promise((resolve) => {
      resolveFunction.current = resolve
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
    })

  return {
    updateName,
    updateEmail,
    updateRegion,
    updateLoginExpirationDate,
    updateUserOrganisation,
  }
}
