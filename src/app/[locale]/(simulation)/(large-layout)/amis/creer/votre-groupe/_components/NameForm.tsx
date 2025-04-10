'use client'

import Trans from '@/components/translation/trans/TransClient'
import { GROUP_EMOJIS } from '@/constants/group'
import { amisCreationEtapeVosInformationsSuivant } from '@/constants/tracking/pages/amisCreation'
import Button from '@/design-system/inputs/Button'
import GridRadioInputs from '@/design-system/inputs/GridRadioInputs'
import TextInputGroup from '@/design-system/inputs/TextInputGroup'
import { useCreateGroup } from '@/hooks/groups/useCreateGroup'
import { useEndPage } from '@/hooks/navigation/useEndPage'
import { useSimulateurPage } from '@/hooks/navigation/useSimulateurPage'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useCurrentSimulation, useUser } from '@/publicodes-state'
import { trackEvent } from '@/utils/analytics/trackEvent'
import { formatEmail } from '@/utils/format/formatEmail'
import { captureException } from '@sentry/nextjs'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm as useReactHookForm } from 'react-hook-form'

type Inputs = {
  name: string
  emoji: string
}

export default function NameForm() {
  const { t } = useClientTranslation()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useReactHookForm<Inputs>()

  const [error, setError] = useState('')

  const { user } = useUser()

  const searchParams = useSearchParams()

  const { mutateAsync: createGroup, isPending, isSuccess } = useCreateGroup()

  const [shouldNavigate, setShouldNavigate] = useState<string | undefined>(
    undefined
  )

  const currentSimulation = useCurrentSimulation()
  const hasCompletedTest = currentSimulation.progression === 1

  const { goToSimulateurPage } = useSimulateurPage()
  const { goToEndPage } = useEndPage()

  useEffect(() => {
    if (
      shouldNavigate &&
      currentSimulation.groups?.includes(shouldNavigate || '')
    ) {
      setShouldNavigate(undefined)
      if (hasCompletedTest) {
        goToEndPage({ allowedToGoToGroupDashboard: true })
      } else {
        goToSimulateurPage()
      }
    }
  }, [
    currentSimulation.groups,
    hasCompletedTest,
    goToEndPage,
    goToSimulateurPage,
    shouldNavigate,
  ])

  async function onSubmit({ name, emoji }: Inputs) {
    if (error) {
      setError('')
    }

    try {
      const administratorEmail = formatEmail(
        searchParams.get('administratorEmail')
      )
      const administratorName = searchParams.get('administratorName')

      const group = await createGroup({
        groupInfo: {
          name: name ?? '',
          emoji: emoji ?? '',
          administrator: {
            userId: user.userId,
            name: administratorName ?? '',
            ...(administratorEmail ? { email: administratorEmail } : {}),
          },
        },
      })

      // Update current simulation with group id (to redirect after test completion)
      currentSimulation.update({
        groupToAdd: group.id,
      })

      trackEvent(amisCreationEtapeVosInformationsSuivant)

      setShouldNavigate(group.id)
    } catch (e) {
      setError(
        t(
          'Une erreur est survenue. Si le problème persiste, veuillez contacter notre support.'
        )
      )
      captureException(e)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <TextInputGroup
        label={<Trans>Choisissez un nom pour ce groupe</Trans>}
        helperText={
          <Trans>Pour le retrouver facilement dans votre liste</Trans>
        }
        data-cypress-id="group-name"
        error={errors.name?.message}
        {...register('name', {
          required: t('Ce champ est obligatoire.'),
          maxLength: { value: 50, message: t('Ce champ est trop long') },
        })}
      />

      <GridRadioInputs
        control={control as any}
        label={<Trans>Et une illustration</Trans>}
        helperText={<Trans>Pour faire joli et le reconnaitre !</Trans>}
        name="emoji"
        data-cypress-id="group-select-emoji"
        items={GROUP_EMOJIS.map(({ emoji, label }) => ({
          value: emoji,
          label: emoji,
          ariaLabel: t(label),
        }))}
        rules={{ required: t('Ce champ est obligatoire.') }}
        error={errors.emoji?.message}
      />

      {error && <p className="mt-4 text-sm text-red-700">{error}</p>}

      <Button
        type="submit"
        data-cypress-id="button-validate-create-group"
        className="mt-4 self-start"
        disabled={isPending || isSuccess}>
        {hasCompletedTest ? (
          <Trans>Créer le groupe</Trans>
        ) : (
          <Trans>Créer et passer mon test</Trans>
        )}
      </Button>
    </form>
  )
}
