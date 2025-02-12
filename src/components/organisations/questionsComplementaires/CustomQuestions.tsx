import Trans from '@/components/translation/Trans'
import type { PollToUpdate } from '@/hooks/organisations/polls/useUpdatePoll'
import type { Organisation, OrganisationPoll } from '@/types/organisations'
import CustomQuestion from './customQuestions/CustomQuestion'

type Props = {
  organisation: Organisation
  poll: Pick<
    OrganisationPoll,
    'customAdditionalQuestions' | 'defaultAdditionalQuestions'
  >
  onChange: (changes: PollToUpdate) => void
}

export default function CustomQuestions({
  poll,
  onChange,
  organisation,
}: Props) {
  if (poll?.customAdditionalQuestions?.length === 0) {
    return null
  }

  return (
    <>
      <h3 className="mt-8">
        <Trans locale={locale}>Questions personnalisées</Trans>
      </h3>
      <div className="flex flex-col gap-4">
        {poll?.customAdditionalQuestions?.map(({ question, isEnabled }) => (
          <CustomQuestion
            key={question}
            question={question}
            isEnabled={isEnabled}
            organisation={organisation}
            poll={poll}
            onChange={onChange}
          />
        ))}
      </div>
    </>
  )
}
