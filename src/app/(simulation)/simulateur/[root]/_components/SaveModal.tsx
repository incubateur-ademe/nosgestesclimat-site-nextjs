'use client'

import Trans from '@/components/translation/Trans'
import Button from '@/design-system/inputs/Button'
import TextInputGroup from '@/design-system/inputs/TextInputGroup'
import Title from '@/design-system/layout/Title'
import Modal from '@/design-system/modals/Modal'
import { useSaveSimulation } from '@/hooks/simulation/useSaveSimulation'
import { useIframe } from '@/hooks/useIframe'
import { useCurrentSimulation, useUser } from '@/publicodes-state'
import { isEmailValid } from '@/utils/isEmailValid'
import { useEffect } from 'react'
import { SubmitHandler, useForm as useReactHookForm } from 'react-hook-form'

type Props = {
  isOpen: boolean
  closeModal: () => void
}
type Inputs = {
  email?: string
}

export default function SaveModal({ isOpen, closeModal }: Props) {
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

  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeModal}
      buttons={
        currentSimulation.savedViaEmail ? (
          <Button onClick={closeModal}>Continuer mon test</Button>
        ) : (
          <Button
            type="submit"
            form={'save-form'}
            disabled={isPending}
            className="inline">
            <Trans>
              Sauvegarder{' '}
              <span className="hidden lg:inline">ma progression</span>
            </Trans>
          </Button>
        )
      }>
      {currentSimulation.savedViaEmail ? (
        <Title
          tag="h2"
          hasSeparator={false}
          subtitle={
            <Trans>
              Vous pouvez la reprendre plus tard en cliquant sur le lien que
              vous avez reçu par email.
            </Trans>
          }>
          <Trans>Votre simulation est sauvegardée !</Trans>
        </Title>
      ) : (
        <form
          id="save-form"
          className="flex h-full flex-col items-start"
          onSubmit={handleSubmit(onSubmit)}>
          <Title
            tag="h2"
            subtitle={
              <Trans>
                Recevez par email un lien pour reprendre votre test plus tard.
              </Trans>
            }>
            <Trans>Reprendre plus tard</Trans>
          </Title>

          <div className="flex w-full flex-col items-start gap-4">
            <TextInputGroup
              required
              type="email"
              aria-label="Entrez votre adresse email"
              {...register('email')}
            />

            {isError && (
              <p className="mt-4 text-sm text-red-700">
                <Trans>
                  Une erreur s'est produite au moment de la sauvegarde.
                </Trans>
              </p>
            )}
          </div>
        </form>
      )}
    </Modal>
  )
}
