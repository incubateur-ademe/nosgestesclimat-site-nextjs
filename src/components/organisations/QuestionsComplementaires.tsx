'use client'

import Trans from '@/components/translation/Trans'
import { getUpdatedDefaultAdditionalQuestions } from '@/helpers/polls/getUpdatedDefaultAdditionalQuestions'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { OrganisationPoll } from '@/types/organisations'
import { ReactNode } from 'react'
import CustomQuestionForm from './questionsComplementaires/CustomQuestionForm'
import CustomQuestions from './questionsComplementaires/CustomQuestions'
import ToggleField from './questionsComplementaires/ToggleField'

type Props = {
  poll:
    | Pick<
        OrganisationPoll,
        'customAdditionalQuestions' | 'defaultAdditionalQuestions'
      >
    | undefined
  onChange: (changes: Record<string, unknown>) => void
  onChangeCustomQuestions: (changes: Record<string, unknown>) => void
  description?: string | ReactNode
}

export default function QuestionsComplementaires({
  poll,
  onChange,
  onChangeCustomQuestions,
  description,
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
            Vous avez la possibilité d’ajouter des questions complémentaires au
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
          poll?.defaultAdditionalQuestions?.includes('postalCode') ?? false
        }
        onChange={(isEnabled: boolean) => {
          onChange({
            defaultAdditionalQuestions: getUpdatedDefaultAdditionalQuestions({
              defaultAdditionalQuestions:
                poll?.defaultAdditionalQuestions ?? [],
              questionKey: 'postalCode',
              value: isEnabled,
            }),
          })
        }}
        label={t('Dans quelle ville habitez-vous ?')}
      />

      <ToggleField
        name="birthdateToggle"
        value={poll?.defaultAdditionalQuestions?.includes('birthdate') ?? false}
        onChange={(isEnabled: boolean) => {
          onChange({
            defaultAdditionalQuestions: getUpdatedDefaultAdditionalQuestions({
              defaultAdditionalQuestions:
                poll?.defaultAdditionalQuestions ?? [],
              questionKey: 'birthdate',
              value: isEnabled,
            }),
          })
        }}
        label={t('Quelle est votre année de naissance ?')}
      />

      {poll?.customAdditionalQuestions && (
        <CustomQuestions poll={poll} onChange={onChangeCustomQuestions} />
      )}

      <div className="my-6 flex w-full flex-col items-start gap-2">
        <CustomQuestionForm poll={poll} onCompleted={onChangeCustomQuestions} />
      </div>
    </section>
  )
}
