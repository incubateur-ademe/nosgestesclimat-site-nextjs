export const fetchPoll = async (id: string | null): Promise<PollInfo> => {
  const response = await fetch(`/api/pollinfo/?id=${id}`)
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
  additionalQuestions: ['postalcode' | 'birthdate']
  expectedNumberOfParticipants: number
  organisationInfo: OrganisationInfo
}

type OrganisationInfo = {
  name: string
  slug: string
}
