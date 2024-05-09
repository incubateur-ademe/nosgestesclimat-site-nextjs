'use client'

import { useUpdateOrganisation } from '@/app/(layout-with-navigation)/(simulation)/organisations/_hooks/useUpdateOrganisation'
import ModificationSaved from '@/components/messages/ModificationSaved'
import Trans from '@/components/translation/Trans'
import { organisationsParametersToggleAdditionnalQuestionsPostCode } from '@/constants/tracking/pages/organisationsParameters'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useUser } from '@/publicodes-state'
import { Organisation } from '@/types/organisations'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { useEffect, useRef, useState } from 'react'
import CustomQuestionForm from './questionsComplementaires/CustomQuestionForm'
import CustomQuestions from './questionsComplementaires/CustomQuestions'
import ToggleField from './questionsComplementaires/ToggleField'

type Props = {
  organisation: Organisation | undefined
  refetchOrganisation: () => void
}

export default function QuestionsComplementaires({
  organisation,
  refetchOrganisation,
}: Props) {
  const [isConfirmingUpdate, setIsConfirmingUpdate] = useState(false)

  const { t } = useClientTranslation()

  const { user } = useUser()

  const poll = organisation?.polls[0]

  const { mutateAsync: updateOrganisation } = useUpdateOrganisation({
    email: user?.organisation?.administratorEmail ?? '',
  })

  const timeoutRef = useRef<NodeJS.Timeout>()

  function showAndHideConfirmationMessage() {
    setIsConfirmingUpdate(true)

    timeoutRef.current = setTimeout(() => {
      setIsConfirmingUpdate(false)
      timeoutRef.current = undefined
    }, 2000)
  }

  const handleChange = async ({
    questionKey,
    value,
  }: {
    questionKey: string
    value: boolean
  }) => {
    if (questionKey === 'postalCode') {
      trackEvent(
        organisationsParametersToggleAdditionnalQuestionsPostCode(value)
      )
    }
    if (questionKey === 'birthdate') {
      trackEvent(
        organisationsParametersToggleAdditionnalQuestionsPostCode(value)
      )
    }

    const defaultAdditionalQuestions =
      poll?.defaultAdditionalQuestions ?? ([] as string[])

    if (value && !defaultAdditionalQuestions.includes(questionKey)) {
      defaultAdditionalQuestions.push(questionKey)
    } else if (!value && defaultAdditionalQuestions.includes(questionKey)) {
      defaultAdditionalQuestions.splice(
        defaultAdditionalQuestions.indexOf(questionKey),
        1
      )
    }

    // Always return an array with the same order, postalCode first if it is present, then birthdate
    defaultAdditionalQuestions.sort((a, b) => {
      if (a === 'postalCode') return -1
      if (b === 'postalCode') return 1
      return 0
    })

    await updateOrganisation({
      defaultAdditionalQuestions,
    })

    refetchOrganisation()
    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    showAndHideConfirmationMessage()
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

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
          handleChange({ questionKey: 'postalCode', value: isEnabled })
        }}
        label={t('Dans quelle ville habitez-vous ?')}
      />

      <ToggleField
        name="birthdateToggle"
        value={poll?.defaultAdditionalQuestions.includes('birthdate') ?? false}
        onChange={(isEnabled: boolean) => {
          handleChange({ questionKey: 'birthdate', value: isEnabled })
        }}
        label={t('Quelle est votre année de naissance ?')}
      />

      {poll?.customAdditionalQuestions && (
        <CustomQuestions
          organisation={organisation}
          poll={organisation?.polls?.[0]}
          showAndHideConfirmationMessage={showAndHideConfirmationMessage}
          refetchOrganisation={refetchOrganisation}
        />
      )}

      <div className="mt-6 flex w-full flex-col items-start gap-2">
        <CustomQuestionForm
          organisation={organisation}
          refetchOrganisation={refetchOrganisation}
        />

        <ModificationSaved
          shouldShowMessage={isConfirmingUpdate}
          label={<Trans>Modification sauvegardée</Trans>}
        />
      </div>
    </section>
  )
}
