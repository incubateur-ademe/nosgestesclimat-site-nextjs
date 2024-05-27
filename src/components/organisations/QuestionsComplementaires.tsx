'use client'

import Trans from '@/components/translation/Trans'
import { getUpdatedDefaultAdditionalQuestions } from '@/helpers/polls/getUpdatedDefaultAdditionalQuestions'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { OrganisationPoll } from '@/types/organisations'
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
}

export default function QuestionsComplementaires({ poll, onChange }: Props) {
  const { t } = useClientTranslation()

  return (
    <section className="mb-12 mt-8">
      <h2>
        <Trans>Questions complémentaires</Trans>
      </h2>

      <p className="mb-8">
        <Trans>
          Vous avez la possibilité d’ajouter des questions complémentaires au
          test pour vos statistiques. Vos questions additionnelles activées
          seront posées à chaque participant en amont du test Nos Gestes Climat.
          Leur réponse sera facultative.
        </Trans>
      </p>

      <h3>
        <Trans>Questions par défaut</Trans>
      </h3>

      <ToggleField
        name="villeToggle"
        className="mb-4"
        value={poll?.defaultAdditionalQuestions.includes('postalCode') ?? false}
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
        value={poll?.defaultAdditionalQuestions.includes('birthdate') ?? false}
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
        <CustomQuestions poll={poll} onChange={onChange} />
      )}

      <div className="mt-6 flex w-full flex-col items-start gap-2">
        <CustomQuestionForm poll={poll} onCompleted={onChange} />
      </div>
    </section>
  )
}
