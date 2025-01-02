'use client'

import Trans from '@/components/translation/Trans'
import Button from '@/design-system/inputs/Button'
import Title from '@/design-system/layout/Title'
import Modal from '@/design-system/modals/Modal'
import { useSaveSimulation } from '@/hooks/simulation/useSaveSimulation'
import { useIframe } from '@/hooks/useIframe'
import { useCurrentSimulation, useUser } from '@/publicodes-state'
import { isEmailValid } from '@/utils/isEmailValid'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { useForm as useReactHookForm } from 'react-hook-form'
import SaveSimulationForm from './saveModal/SaveSimulationForm'

type Props = {
  isOpen: boolean
  closeModal: () => void
}
type Inputs = {
  email?: string
}

export default function BackHomeModal({ isOpen, closeModal }: Props) {
  const [isAlreadySavedSimulationUpdated, setIsAlreadySavedSimulationUpdated] =
    useState(false)

  const currentSimulation = useCurrentSimulation()

  const { user, updateEmail } = useUser()

  const router = useRouter()

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
      sendEmail: true,
    })
  }

  useEffect(() => {
    if (isSuccess && !currentSimulation.savedViaEmail) {
      // We update the simulation to signify that it has been saved (and not show the form anymore)
      currentSimulation.update({ savedViaEmail: true })
    }
  }, [isSuccess, currentSimulation])

  // Handles the cases where the user has already saved the simulation in a useEffect
  // by updating the simulation saved
  useEffect(() => {
    if (
      currentSimulation.savedViaEmail &&
      !isAlreadySavedSimulationUpdated &&
      !isSuccess &&
      !isError
    ) {
      saveSimulation({
        simulation: currentSimulation,
      })
      setIsAlreadySavedSimulationUpdated(true)
    }
  }, [
    currentSimulation,
    currentSimulation.savedViaEmail,
    isAlreadySavedSimulationUpdated,
    isError,
    isSuccess,
    saveSimulation,
  ])

  // We do not display the component if we are in an iframeSimulation context
  const { isIframeOnlySimulation } = useIframe()
  if (isIframeOnlySimulation) return null

  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeModal}
      hasAbortButton={false}
      buttons={
        <>
          <Button color="secondary" onClick={() => router.push('/')}>
            <Trans>Revenir à l'accueil</Trans>
          </Button>
          {currentSimulation.savedViaEmail ? (
            <Button onClick={closeModal}>Continuer mon test</Button>
          ) : (
            <Button
              type="submit"
              form={'save-form'}
              disabled={isPending}
              className="inline"
              data-cypress-id="save-modal-submit-button">
              <Trans>
                Sauvegarder{' '}
                <span className="hidden lg:inline">ma progression</span>
              </Trans>
            </Button>
          )}
        </>
      }>
      {currentSimulation.savedViaEmail && (
        <Title
          tag="h2"
          hasSeparator={false}
          className="flex items-center gap-1"
          subtitle={
            <Trans>
              Votre test est sauvegardé, vous pourrez le reprendre plus tard en
              cliquant sur le lien que vous avez reçu par email.
            </Trans>
          }>
          <Trans>Revenir à l'accueil</Trans>
        </Title>
      )}

      {!currentSimulation.savedViaEmail && (
        <SaveSimulationForm
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          register={register}
          isError={isError}
          backHome={true}
        />
      )}
    </Modal>
  )
}
