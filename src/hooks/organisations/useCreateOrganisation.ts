import type { OrganisationTypeEnum } from '@/constants/organisations/organisationTypes'
import { ORGANISATION_URL } from '@/constants/urls'
import type { Organisation } from '@/types/organisations'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

type OrganisationCreateDto = {
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
    mutationFn: (dto: OrganisationCreateDto) =>
      axios
        .post<Organisation>(ORGANISATION_URL, dto, {
          withCredentials: true,
        })
        .then((response) => response.data),
  })
}
