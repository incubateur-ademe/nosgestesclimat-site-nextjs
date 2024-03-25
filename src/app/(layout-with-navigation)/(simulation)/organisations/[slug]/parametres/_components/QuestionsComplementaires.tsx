import { useUpdateOrganisation } from '@/app/(layout-with-navigation)/(simulation)/organisations/_hooks/useUpdateOrganisation'
import ModificationSaved from '@/components/messages/ModificationSaved'
import Trans from '@/components/translation/Trans'
import { getClickAdditionalQuestionEvent } from '@/constants/matomo/organisations'
import { useUser } from '@/publicodes-state'
import { Organisation } from '@/types/organisations'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { useEffect, useRef, useState } from 'react'
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

  const { user } = useUser()

  const poll = organisation?.polls[0]

  const { mutateAsync: updateOrganisation } = useUpdateOrganisation({
    email: user?.organisation?.administratorEmail ?? '',
  })

  const timeoutRef = useRef<NodeJS.Timeout>()

  const handleChange = async ({
    questionKey,
    value,
  }: {
    questionKey: string
    value: boolean
  }) => {
    trackEvent(getClickAdditionalQuestionEvent(questionKey, value))

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

    setIsConfirmingUpdate(true)

    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    timeoutRef.current = setTimeout(() => {
      setIsConfirmingUpdate(false)
      timeoutRef.current = undefined
    }, 2000)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <section className="mb-12 mt-8">
      <h2>
        <Trans>Question complémentaires</Trans>
      </h2>
      <p>
        <Trans>
          Vous avez la possibilité d’ajouter des questions complémentaires au
          test pour vos statistiques.
        </Trans>
      </p>
      <p className="mb-8 text-sm text-gray-500">
        <Trans>
          Vos questions additionnelles activées seront posées à chaque
          participant en amont du test Nos Gestes Climat. Leur réponse sera
          facultative.
        </Trans>
      </p>

      <div className="mb-4 rounded-md border border-grey-200">
        <ToggleField
          name="villeToggle"
          value={
            poll?.defaultAdditionalQuestions.includes('postalCode') ?? false
          }
          onChange={(isEnabled: boolean) => {
            handleChange({ questionKey: 'postalCode', value: isEnabled })
          }}
          label={<Trans>Dans quelle ville habitez-vous ?</Trans>}
        />
      </div>

      <div className="rounded-md border border-grey-200">
        <ToggleField
          name="birthdateToggle"
          value={
            poll?.defaultAdditionalQuestions.includes('birthdate') ?? false
          }
          onChange={(isEnabled: boolean) => {
            handleChange({ questionKey: 'birthdate', value: isEnabled })
          }}
          label={<Trans>Quelle est votre année de naissance ?</Trans>}
        />
      </div>

      <ModificationSaved
        shouldShowMessage={isConfirmingUpdate}
        label={<Trans>Modification sauvegardée</Trans>}
      />
    </section>
  )
}
