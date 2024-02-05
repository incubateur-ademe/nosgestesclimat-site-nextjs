import { usePollId } from './organisations/usePollId'

export default function useAppNavigation() {
  const { pollId } = usePollId()

  const linkAfterTutorial = pollId ? `simulateur/infos` : `simulateur/bilan`

  return { linkAfterTutorial }
}
