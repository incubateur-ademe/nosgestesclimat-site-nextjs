import { SERVER_URL } from '@/constants/urls'

type Props = {
  pollSlug?: string | null
}
export const fetchPoll = async ({ pollSlug }: Props): Promise<PollInfo> => {
  const response = await fetch(
    `${SERVER_URL}/organizations/fetch-poll/${pollSlug}`
  )
  if (!response.ok) {
    throw new Error('Failed to fetch poll')
  }
  return response.json()
}

type PollInfo = {
  startDate: string
  endDate: string
  name: string
  slug: string
  defaultAdditionalQuestions: ['postalCode' | 'birthdate']
  expectedNumberOfParticipants: number
  organisationInfo?: OrganisationInfo
}

type OrganisationInfo = {
  name: string
  slug: string
}
