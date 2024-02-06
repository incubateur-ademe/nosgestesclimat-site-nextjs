import { useSearchParams } from 'next/navigation'

export function usePollId() {
  const attributeName = 'sondage'

  const searchParams = useSearchParams()

  const pollId = searchParams.get(attributeName)

  return { pollId, attributeName }
}
