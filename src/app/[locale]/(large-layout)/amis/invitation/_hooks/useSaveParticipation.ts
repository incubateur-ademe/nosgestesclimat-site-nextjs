import { useSimulateurPage } from '@/hooks/navigation/useSimulateurPage'
import { useCurrentSimulation, useUser } from '@/publicodes-state'
import { formatEmail } from '@/utils/format/formatEmail'

interface Props {
  groupId: string
}

interface HandleSaveParticipationProps {
  guestName: string
  guestEmail: string
}

export function useSaveParticipation({ groupId }: Props) {
  const { updateName, updateEmail } = useUser()

  const currentSimulation = useCurrentSimulation()
  const { goToSimulateurPage } = useSimulateurPage()

  const handleSaveParticipation = ({
    guestName,
    guestEmail,
  }: HandleSaveParticipationProps) => {
    const formattedQuestEmail = formatEmail(guestEmail)

    // Update user info
    updateName(guestName)
    updateEmail(formattedQuestEmail)

    // Update current simulation with group id (to redirect after test completion)
    currentSimulation.update({
      groupToAdd: groupId,
    })

    goToSimulateurPage()
  }

  return { handleSaveParticipation }
}
