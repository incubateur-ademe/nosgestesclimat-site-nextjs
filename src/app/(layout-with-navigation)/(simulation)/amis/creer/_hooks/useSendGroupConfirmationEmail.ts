import { Group } from '@/types/groups'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

const groupBaseURL = `${window.location.origin}/amis`

type MutationFnProps = {
  email: string
  prenom: string
  group: Group
  userId: string
}

export const useSendGroupConfirmationEmail = () => {
  return useMutation({
    mutationFn: ({ email, prenom, group, userId }: MutationFnProps) =>
      axios.post('/api/send-group-email', {
        email,
        name: prenom,
        groupName: group.name,
        isCreation: true,
        groupURL: `${groupBaseURL}/resultats?groupId=${group?._id}&mtm_campaign=voir-mon-groupe-email`,
        shareURL: `${groupBaseURL}/invitation?groupId=${group?._id}&mtm_campaign=invitation-groupe-email`,
        deleteURL: `${groupBaseURL}/supprimer?groupId=${group?._id}&userId=${userId}&mtm_campaign=invitation-groupe-email`,
      }),
  })
}
