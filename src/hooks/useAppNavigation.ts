import { useSearchParams } from 'next/navigation'
import { usePoll } from './organisations/usePoll'
import { usePollId } from './organisations/usePollId'

export function useAppNavigation() {
  const searchParams = useSearchParams()
  const queryParamsString = searchParams.toString()

  const { pollId } = usePollId()
  const { data: poll } = usePoll(pollId)

  const linkToTutorial = `/tutoriel?${queryParamsString}`

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

  return {
    linkToTutorial,
    getLinkToInfosPage,
  }
}
