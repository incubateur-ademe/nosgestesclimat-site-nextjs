import { useUser } from '@/publicodes-state'
import { useSearchParams } from 'next/navigation'
import { usePoll } from '../organisations/usePoll'
import { usePollId } from '../organisations/usePollId'

/**
 * Really rought hook to provide adequate links to the user, depending on his current state
 */
export function useAppNavigation() {
  const searchParams = useSearchParams()
  const queryParamsString = searchParams.toString()

  const { getCurrentSimulation } = useUser()
  const currentSimulation = getCurrentSimulation()

  const { pollId } = usePollId()
  const { data: poll } = usePoll(pollId)

  const linkToTutorial = `/tutoriel?${queryParamsString}`

  const linkToPollDashboard = `organisations/resultats-detailles/${currentSimulation?.poll}`

  const getLinkToInfosPage = (index: number) => {
    const infosPages = {
      email: `/infos/email?${queryParamsString}`,
      postalcode: `/infos/codepostal?${queryParamsString}`,
      birthdate: `/infos/naissance?${queryParamsString}`,
    }

    // if there is no poll, go to the test
    if (!poll) {
      return `/simulateur/bilan`
    }

    if (index === 0) {
      return infosPages.email
    }

    // if there is no poll or no additional question, go to the test
    if ((poll?.additionalQuestions.length || 0) < index) {
      return `/infos/commencer?${queryParamsString}`
    }

    // if there is an additional question, go to the corresponding page
    return infosPages[poll.additionalQuestions[index - 1]]
  }

  const linkToEndPage = `/fin`

  return {
    linkToTutorial,
    linkToPollDashboard,
    getLinkToInfosPage,
    linkToEndPage,
  }
}
