'use client'

import Trans from '@/components/translation/Trans'
import { GROUP_EMOJIS } from '@/constants/group'
import { amisCreationEtapeVotreGroupeSuivant } from '@/constants/tracking/pages/amisCreation'
import Button from '@/design-system/inputs/Button'
import GridRadioInputs from '@/design-system/inputs/GridRadioInputs'
import TextInputGroup from '@/design-system/inputs/TextInputGroup'
import { useCreateGroup } from '@/hooks/groups/useCreateGroup'
import { useEndPage } from '@/hooks/navigation/useEndPage'
import { useSimulateurPage } from '@/hooks/navigation/useSimulateurPage'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useCurrentSimulation, useUser } from '@/publicodes-state'
import { formatEmail } from '@/utils/format/formatEmail'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { captureException } from '@sentry/react'
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
    try {
      const administratorEmail = formatEmail(
        searchParams.get('administratorEmail')
      )
      const administratorName = searchParams.get('administratorName')

      const group = await createGroup({
        groupInfo: {
          name: name ?? '',
          emoji: emoji ?? '',
          administratorEmail: administratorEmail ?? '',
          administratorName: administratorName ?? '',
          userId: user.userId,
          simulation: currentSimulation,
        },
      })

      // Update current simulation with group id (to redirect after test completion)
      currentSimulation.update({
        groupToAdd: group._id,
      })

      trackEvent(amisCreationEtapeVotreGroupeSuivant)

      setShouldNavigate(group._id)
    } catch (e) {
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
        items={GROUP_EMOJIS.map((emoji) => ({ value: emoji, label: emoji }))}
        rules={{ required: t('Ce champ est obligatoire.') }}
        error={errors.emoji?.message}
      />

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
