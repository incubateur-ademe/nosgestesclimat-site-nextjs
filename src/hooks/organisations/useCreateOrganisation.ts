import type { OrganisationTypeEnum } from '@/constants/organisations/organisationTypes'
import { ORGANISATION_URL } from '@/constants/urls'
import type { Organisation } from '@/types/organisations'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

type OrganisationToCreate = {
  name: string
  type?: OrganisationTypeEnum | null
  numberOfCollaborators?: number
  administrators?: [
    {
      name?: string
      telephone?: string
      position?: string
      optedInForCommunications?: boolean
    },
  ]
}

export function useCreateOrganisation() {
  return useMutation({
    mutationFn: (organisationToCreate: OrganisationToCreate) =>
      axios
        .post<Organisation>(ORGANISATION_URL, organisationToCreate, {
          withCredentials: true,
        })
        .then((response) => response.data),
  })
}
