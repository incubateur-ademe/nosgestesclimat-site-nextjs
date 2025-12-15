'use client'

import DefaultSubmitErrorMessage from '@/components/error/DefaultSubmitErrorMessage'
import Trans from '@/components/translation/trans/TransClient'
import {
  ADMINISTRATOR_EMAIL_KEY,
  ADMINISTRATOR_NAME_KEY,
  GROUP_EMOJIS,
} from '@/constants/group'
import { amisCreationEtapeVosInformationsSuivant } from '@/constants/tracking/pages/amisCreation'
import Button from '@/design-system/buttons/Button'
import GridRadioInputs from '@/design-system/inputs/GridRadioInputs'
import TextInput from '@/design-system/inputs/TextInput'
import { getSearchParamsClientSide } from '@/helpers/getSearchParamsClientSide'
import { useCreateGroup } from '@/hooks/groups/useCreateGroup'
import { useEndPage } from '@/hooks/navigation/useEndPage'
import { useSimulateurPage } from '@/hooks/navigation/useSimulateurPage'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useCurrentSimulation, useUser } from '@/publicodes-state'
import { trackEvent } from '@/utils/analytics/trackEvent'
import { formatEmail } from '@/utils/format/formatEmail'
import { captureException } from '@sentry/nextjs'
import { useEffect, useState } from 'react'
import { useForm as useReactHookForm, type Control } from 'react-hook-form'

interface Inputs {
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

  const searchParams = getSearchParamsClientSide()

  const {
    mutateAsync: createGroup,
    isPending,
    isSuccess,
    isError,
  } = useCreateGroup()

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
        searchParams.get(ADMINISTRATOR_EMAIL_KEY)
      )
      const administratorName = searchParams.get(ADMINISTRATOR_NAME_KEY)

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
      captureException(e)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <TextInput
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
        control={control as unknown as Control<Record<string, string | number>>}
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

      {isError && <DefaultSubmitErrorMessage className="mt-4" />}

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
