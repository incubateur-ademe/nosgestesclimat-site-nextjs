import { useUpdateOrganisation } from '@/app/(layout-with-navigation)/(simulation)/organisations/_hooks/useUpdateOrganisation'
import Trans from '@/components/translation/Trans'
import { useUser } from '@/publicodes-state'
import { Organisation } from '@/types/organisations'
import ToggleField from './questionsComplementaires/ToggleField'

type Props = {
  organisation: Organisation
  refetchOrganisation: () => void
}

export default function QuestionsComplementaires({
  organisation,
  refetchOrganisation,
}: Props) {
  const { user } = useUser()

  const poll = organisation.polls[0]

  const { mutateAsync: updateOrganisation } = useUpdateOrganisation({
    email: user?.email,
  })

  const handleChange = async ({
    questionKey,
    value,
  }: {
    questionKey: string
    value: boolean
  }) => {
    const defaultAdditionalQuestions = poll?.defaultAdditionalQuestions ?? {}

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
  }

  return (
    <section className="mb-12 mt-8">
      <h2>
        <Trans>Question complémentaires</Trans>
      </h2>
      <p className="mb-8">
        <Trans>
          Vous avez la possibilité d’ajouter des questions complémentaires au
          test pour vos statistiques
        </Trans>
      </p>

      <div className="mb-4 rounded-md border border-grey-200">
        <ToggleField
          name="villeToggle"
          value={poll.defaultAdditionalQuestions.includes('postalCode')}
          onChange={(isEnabled: boolean) => {
            handleChange({ questionKey: 'postalCode', value: isEnabled })
          }}
          label={<Trans>Dans quelle ville habitez-vous ?</Trans>}
        />
      </div>

      <div className="rounded-md border border-grey-200">
        <ToggleField
          name="birthdateToggle"
          value={poll.defaultAdditionalQuestions.includes('birthdate')}
          onChange={(isEnabled: boolean) => {
            handleChange({ questionKey: 'birthdate', value: isEnabled })
          }}
          label={<Trans>Quelle est votre année de naissance ?</Trans>}
        />
      </div>
    </section>
  )
}
