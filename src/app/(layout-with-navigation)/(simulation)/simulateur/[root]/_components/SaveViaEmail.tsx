// NOT USED FOR NOW

'use client'

import Trans from '@/components/translation/Trans'
import Button from '@/design-system/inputs/Button'
import EmailInput from '@/design-system/inputs/EmailInput'
import { useSaveSimulation } from '@/hooks/simulation/useSaveSimulation'
import { useClientTranslation } from '@/hooks/useClientTranslation'

import { useIframe } from '@/hooks/useIframe'
import { useCurrentSimulation, useUser } from '@/publicodes-state'
import { useForm as useReactHookForm } from 'react-hook-form'

type Inputs = {
  email: string
}

export default function SaveViaEmail() {
  const { user, updateEmail } = useUser()

  const { t } = useClientTranslation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useReactHookForm<Inputs>({
    defaultValues: {
      email: user?.email || '',
    },
    mode: 'onSubmit',
  })

  const currentSimulation = useCurrentSimulation()

  const { saveSimulation, isPending, isSuccess, isError } = useSaveSimulation()

  async function onSubmit({ email }: Inputs) {
    if (isPending) {
      return
    }

    updateEmail(email)

    saveSimulation({
      simulation: {
        ...currentSimulation,
        savedViaEmail: true,
      },
      shouldSendSimulationEmail: true,
    })
  }

  // We do not display the component if we are in an iframeSimulation context
  const { isIframeOnlySimulation } = useIframe()
  if (isIframeOnlySimulation) return null

  return (
    <div className="mx-auto mb-4 rounded-lg bg-primary-100 p-4 text-center">
      <p>
        <Trans>
          Recevez un email avec un lien pour terminer votre test plus tard
        </Trans>
      </p>
      {isSuccess ? (
        <p>
          <Trans>Bravo champion·ne !</Trans>
        </p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <EmailInput
            error={errors?.email?.message}
            className="bg-white"
            {...register('email', {
              required: t('Ce champ est requis.'),
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: t('Veuillez entrer une adresse email valide'),
              },
            })}
          />
          <Button disabled={isPending}>
            <Trans>Valider</Trans>
          </Button>
          {isSuccess && 'success'}
          {isError && 'error'}
        </form>
      )}
    </div>
  )
}
