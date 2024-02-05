import { useSearchParams } from 'next/navigation'

export function usePollId() {
  const searchParams = useSearchParams()

  const pollId = searchParams.get('sondage')

  return { pollId }
}
