import Trans from '@/components/translation/Trans'
import { OrganisationPoll } from '@/types/organisations'
import CustomQuestion from './customQuestions/CustomQuestion'

type Props = {
  poll:
    | Pick<
        OrganisationPoll,
        'customAdditionalQuestions' | 'defaultAdditionalQuestions'
      >
    | undefined
  onChange: (changes: Record<string, unknown>) => void
}

export default function CustomQuestions({ poll, onChange }: Props) {
  if (poll?.customAdditionalQuestions?.length === 0) {
    return null
  }

  return (
    <>
      <h3 className="mt-8">
        <Trans>Questions personnalisées</Trans>
      </h3>
      <div className="flex flex-col gap-4">
        {poll?.customAdditionalQuestions?.map(({ question, isEnabled }) => (
          <CustomQuestion
            key={question}
            question={question}
            isEnabled={isEnabled}
            poll={poll}
            onChange={onChange}
          />
        ))}
      </div>
    </>
  )
}
