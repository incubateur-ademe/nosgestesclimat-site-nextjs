'use client'

import Trans from '@/components/translation/trans/TransClient'
import { getUpdatedDefaultAdditionalQuestions } from '@/helpers/polls/getUpdatedDefaultAdditionalQuestions'
import type { PollToUpdate } from '@/hooks/organisations/polls/useUpdatePoll'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import type { Organisation, OrganisationPoll } from '@/types/organisations'
import type { ReactNode } from 'react'
import { PollDefaultAdditionalQuestion } from '../../constants/organisations/pollDefaultAdditionalQuestion'
import CustomQuestionForm from './questionsComplementaires/CustomQuestionForm'
import CustomQuestions from './questionsComplementaires/CustomQuestions'
import ToggleField from './questionsComplementaires/ToggleField'

interface Props {
  organisation: Organisation
  poll: Pick<
    OrganisationPoll,
    'customAdditionalQuestions' | 'defaultAdditionalQuestions'
  >
  onChange: (pollToUpdate: PollToUpdate) => void
  description?: string | ReactNode
}

export default function QuestionsComplementaires({
  poll,
  onChange,
  description,
  organisation,
}: Props) {
  const { t } = useClientTranslation()

  return (
    <section className="mt-8">
      <h2>
        <Trans>Questions complémentaires</Trans>
      </h2>

      <p className="mb-8">
        {description ?? (
          <Trans>
            Vous avez la possibilité d'ajouter des questions complémentaires au
            test pour vos statistiques. Vos questions additionnelles activées
            seront posées à chaque participant en amont du test Nos Gestes
            Climat. Leur réponse sera facultative.
          </Trans>
        )}
      </p>

      <h3>
        <Trans>Questions par défaut</Trans>
      </h3>

      <ToggleField
        name="villeToggle"
        className="mb-4"
        value={
          poll.defaultAdditionalQuestions?.includes(
            PollDefaultAdditionalQuestion.postalCode
          ) ?? false
        }
        data-testid="poll-default-additional-questions-postal-code-toggle"
        onChange={(isEnabled: boolean) => {
          onChange({
            defaultAdditionalQuestions: getUpdatedDefaultAdditionalQuestions({
              defaultAdditionalQuestions: poll.defaultAdditionalQuestions ?? [],
              questionKey: PollDefaultAdditionalQuestion.postalCode,
              value: isEnabled,
            }),
          })
        }}
        label={t('Dans quelle ville habitez-vous ?')}
      />

      <ToggleField
        name="birthdateToggle"
        value={
          poll.defaultAdditionalQuestions?.includes(
            PollDefaultAdditionalQuestion.birthdate
          ) ?? false
        }
        onChange={(isEnabled: boolean) => {
          onChange({
            defaultAdditionalQuestions: getUpdatedDefaultAdditionalQuestions({
              defaultAdditionalQuestions: poll.defaultAdditionalQuestions ?? [],
              questionKey: PollDefaultAdditionalQuestion.birthdate,
              value: isEnabled,
            }),
          })
        }}
        label={t('Quelle est votre année de naissance ?')}
      />

      {!!poll && (
        <CustomQuestions
          organisation={organisation}
          poll={poll}
          onChange={onChange}
        />
      )}

      <div className="my-6 flex w-full flex-col items-start gap-2">
        <CustomQuestionForm
          organisation={organisation}
          poll={poll}
          onCompleted={onChange}
        />
      </div>
    </section>
  )
}
