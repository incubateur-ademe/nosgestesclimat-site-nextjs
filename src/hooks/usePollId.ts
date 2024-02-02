import { useSearchParams } from 'next/navigation'

export default function usePollId() {
  const searchParams = useSearchParams()

  const pollId = searchParams.get('poll')

  return { pollId }
}
