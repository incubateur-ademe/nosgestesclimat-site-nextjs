import type { OrganisationTypeEnum } from '@/constants/organisations/organisationTypes'
import { ORGANISATION_URL } from '@/constants/urls'
import type {
  OrgaSettingsInputsType,
  Organisation,
} from '@/types/organisations'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

type OrganisationUpdateDto = {
  name?: string
  type?: OrganisationTypeEnum | null
  numberOfCollaborators?: number | null
  administrators?: [
    {
      name?: string | null
      telephone?: string | null
      position?: string | null
      email?: string
      optedInForCommunications?: boolean
    },
  ]
}

export function useUpdateOrganisation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      organisationIdOrSlug,
      formData,
      code,
    }: {
      organisationIdOrSlug: string
      formData: OrgaSettingsInputsType
      email?: string
      code?: string
    }) => {
      const dto: OrganisationUpdateDto = {
        ...(formData.name ? { name: formData.name } : {}),
        ...(formData.organisationType
          ? { type: formData.organisationType }
          : { type: null }),
        ...(formData.numberOfCollaborators && +formData.numberOfCollaborators
          ? { numberOfCollaborators: +formData.numberOfCollaborators }
          : { numberOfCollaborators: null }),
        administrators: [
          {
            ...(formData.administratorName
              ? { name: formData.administratorName }
              : { name: null }),
            ...(formData.administratorTelephone
              ? { telephone: formData.administratorTelephone }
              : { telephone: null }),
            ...(formData.position
              ? { position: formData.position }
              : { position: null }),
            ...(formData.hasOptedInForCommunications
              ? {
                  optedInForCommunications:
                    formData.hasOptedInForCommunications,
                }
              : {}),
            ...(formData.email ? { email: formData.email } : {}),
          },
        ],
      }

      return axios
        .put<Organisation>(`${ORGANISATION_URL}/${organisationIdOrSlug}`, dto, {
          withCredentials: true,
          params: {
            code,
          },
        })
        .then((response) => response.data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['organisations'],
      })
    },
  })
}
