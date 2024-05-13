'use client'

import Trans from '@/components/translation/Trans'
import Button from '@/design-system/inputs/Button'
import TextInputGroup from '@/design-system/inputs/TextInputGroup'
import Title from '@/design-system/layout/Title'
import { useSaveSimulation } from '@/hooks/simulation/useSaveSimulation'
import { useIframe } from '@/hooks/useIframe'
import { useCurrentSimulation, useUser } from '@/publicodes-state'
import { isEmailValid } from '@/utils/isEmailValid'
import { useEffect } from 'react'
import { SubmitHandler, useForm as useReactHookForm } from 'react-hook-form'
import SyncIndicator from './saveViaEmail/SyncIndicator'

type Inputs = {
  email?: string
}

export default function SaveViaEmail() {
  const currentSimulation = useCurrentSimulation()

  const { user, updateEmail } = useUser()

  const { register, handleSubmit } = useReactHookForm<Inputs>({
    defaultValues: {
      email: user.email,
    },
  })

  const { saveSimulation, isPending, isSuccess, isError } = useSaveSimulation()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // If the mutation is pending, we do nothing
    if (isPending) {
      return
    }

    // Inputs validation
    if (!data.email || !isEmailValid(data.email)) {
      // setErrorEmail(t('Veuillez renseigner un email valide.'))
      return
    }

    updateEmail(data.email)

    // We save the simulation (and signify the backend to send the email)
    saveSimulation({
      simulation: {
        ...currentSimulation,
        savedViaEmail: true,
      },
      shouldSendSimulationEmail: true,
    })
  }

  useEffect(() => {
    if (isSuccess && !currentSimulation.savedViaEmail) {
      // We update the simulation to signify that it has been saved (and not show the form anymore)
      currentSimulation.update({ savedViaEmail: true })
    }
  }, [isSuccess, currentSimulation])

  // We do not display the component if we are in an iframeSimulation context
  const { isIframeOnlySimulation } = useIframe()
  if (isIframeOnlySimulation) return null

  if (currentSimulation.savedViaEmail) {
    return (
      <div
        className="short:py-2 relative max-w-xl rounded-xl border-2 border-primary-50 bg-gray-100 px-4 py-6"
        id="email-block">
        <Title
          tag="h3"
          hasSeparator={false}
          subtitle={
            <Trans>
              Vous pouvez la reprendre plus tard en cliquant sur le lien que
              vous avez reçu par email.
            </Trans>
          }>
          <Trans>Votre simulation est sauvegardée !</Trans>
        </Title>
        <SyncIndicator />
      </div>
    )
  }

  return (
    <div
      className="short:py-2 relative max-w-xl rounded-xl border-2 border-primary-50 bg-white px-4 py-6"
      id="email-block">
      <form
        id="newsletter-form"
        className="flex h-full flex-col items-start"
        onSubmit={handleSubmit(onSubmit)}>
        <Title
          tag="h3"
          subtitle={
            <Trans>
              Recevez par email un lien pour reprendre votre test plus tard.
            </Trans>
          }>
          <Trans>Sauvegarder ma progression</Trans>
        </Title>

        <div className="flex w-full flex-col items-start gap-4">
          <TextInputGroup
            required
            type="email"
            aria-label="Entrez votre adresse email"
            {...register('email')}
          />

          <Button
            type="submit"
            disabled={isPending}
            className="mt-auto items-start">
            <Trans>Sauvegarder</Trans>
          </Button>

          {isError && (
            <p className="mt-4 text-sm text-red-700">
              <Trans>
                Une erreur s'est produite au moment de la sauvegarde.
              </Trans>
            </p>
          )}
        </div>
      </form>
    </div>
  )
}
