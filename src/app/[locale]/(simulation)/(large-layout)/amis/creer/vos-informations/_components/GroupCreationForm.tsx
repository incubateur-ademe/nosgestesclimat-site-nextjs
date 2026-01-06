'use client'

import Trans from '@/components/translation/trans/TransClient'
import { ADMINISTRATOR_NAME_KEY } from '@/constants/group'
import { amisCreationEtapeVotreGroupeSuivant } from '@/constants/tracking/pages/amisCreation'
import Button from '@/design-system/buttons/Button'
import PrenomInput from '@/design-system/inputs/PrenomInput'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useUser } from '@/publicodes-state'
import { trackEvent } from '@/utils/analytics/trackEvent'
import { useRouter } from 'next/navigation'
import { useForm as useReactHookForm } from 'react-hook-form'

interface Inputs {
  [ADMINISTRATOR_NAME_KEY]: string
}

export default function GroupCreationForm() {
  const { t } = useClientTranslation()

  const { user } = useUser()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useReactHookForm<Inputs>({
    mode: 'onSubmit',
    defaultValues: {
      [ADMINISTRATOR_NAME_KEY]: user.name ?? '',
    },
  })

  const router = useRouter()

  function onSubmit({ [ADMINISTRATOR_NAME_KEY]: administratorName }: Inputs) {
    trackEvent(amisCreationEtapeVotreGroupeSuivant)

    router.push(
      `/amis/creer/votre-groupe?administratorName=${administratorName}`
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <div className="mb-4">
        <PrenomInput
          data-cypress-id="group-input-owner-name"
          error={errors[ADMINISTRATOR_NAME_KEY]?.message}
          value={user.name ?? ''}
          {...register('administratorName', {
            required: t('Ce champ est requis.'),
          })}
        />
      </div>

      <Button type="submit" data-cypress-id="button-continue-create-group">
        <Trans>Continuer</Trans>
      </Button>
    </form>
  )
}
