import QuestionsComplementaires from '@/components/organisations/QuestionsComplementaires'
import Trans from '@/components/translation/Trans'
import TextInputGroup from '@/design-system/inputs/TextInputGroup'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useState } from 'react'
import { useForm as useReactHookForm } from 'react-hook-form'

export default function PollForm() {
  const [pollInfo, setPollInfo] = useState({
    defaultAdditionalQuestions: [] as unknown as [string],
    customAdditionalQuestions: [],
  })
  console.log(pollInfo)
  const { t } = useClientTranslation()

  const { register, handleSubmit } = useReactHookForm()

  function onSubmit() {
    console.log('Submitted')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInputGroup
        label={<Trans>Nom de la campagne</Trans>}
        placeholder={t('ex : Campagne 2024, Classe de 6ème A, etc.')}
        {...register('name')}
      />

      <QuestionsComplementaires
        poll={pollInfo}
        onChange={(updates: Record<string, unknown>) =>
          setPollInfo((prevPollInfo) => ({ ...prevPollInfo, ...updates }))
        }
      />
    </form>
  )
}
