'use client'

import Trans from '@/components/translation/Trans'
import { amisCreationEtapeVotreGroupeSuivant } from '@/constants/tracking/pages/amisCreation'
import Button from '@/design-system/inputs/Button'
import EmailInput from '@/design-system/inputs/EmailInput'
import PrenomInput from '@/design-system/inputs/PrenomInput'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useUser } from '@/publicodes-state'
import { formatEmail } from '@/utils/format/formatEmail'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { useRouter } from 'next/navigation'
import { useForm as useReactHookForm } from 'react-hook-form'

type Inputs = {
  administratorName: string
  administratorEmail: string
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
      administratorName: user.name ?? '',
      administratorEmail: user.email ?? '',
    },
  })

  const { updateName, updateEmail } = useUser()

  const router = useRouter()

  function onSubmit({ administratorName, administratorEmail }: Inputs) {
    trackEvent(amisCreationEtapeVotreGroupeSuivant)

    const formattedAdministratorEmail = formatEmail(administratorEmail)

    // Update user info
    updateName(administratorName ?? '')
    updateEmail(formattedAdministratorEmail ?? '')

    router.push(
      `/amis/creer/votre-groupe?administratorName=${administratorName}&administratorEmail=${formattedAdministratorEmail ?? ''}`
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <PrenomInput
        data-cypress-id="group-input-owner-name"
        error={errors.administratorName?.message}
        value={user.name ?? ''}
        {...register('administratorName', {
          required: t('Ce champ est requis.'),
        })}
      />

      <div className="my-4">
        <EmailInput
          data-cypress-id="group-input-owner-email"
          error={errors.administratorEmail?.message}
          value={user.email ?? ''}
          label={
            <span>
              {t('Votre adresse email')}{' '}
              <span className="italic text-secondary-700">
                {' '}
                {t('facultatif')}
              </span>
            </span>
          }
          {...register('administratorEmail', {
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: 'Veuillez entrer une adresse email valide',
            },
          })}
        />
      </div>

      <Button type="submit" data-cypress-id="button-continue-create-group">
        {' '}
        <Trans>Continuer</Trans>
      </Button>
    </form>
  )
}
