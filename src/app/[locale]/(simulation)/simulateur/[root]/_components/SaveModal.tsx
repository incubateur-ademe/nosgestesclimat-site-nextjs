'use client'

import Trans from '@/components/translation/trans/TransClient'
import { confirmSaveSimulation } from '@/constants/tracking/posthogTrackers'
import { confirmSaveSimulationEvent } from '@/constants/tracking/simulation'
import Button from '@/design-system/buttons/Button'
import Modal from '@/design-system/modals/Modal'
import { useSaveSimulation } from '@/hooks/simulation/useSaveSimulation'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useIframe } from '@/hooks/useIframe'
import { useCurrentSimulation, useFormState, useUser } from '@/publicodes-state'
import { trackEvent, trackPosthogEvent } from '@/utils/analytics/trackEvent'
import { isEmailValid } from '@/utils/isEmailValid'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { useForm as useReactHookForm } from 'react-hook-form'
import ConfirmationMessage from './saveModal/ConfirmationMessage'
import SaveSimulationForm from './saveModal/SaveSimulationForm'

interface Props {
  isOpen: boolean
  closeModal: () => void
  mode: 'save' | 'backHome'
}
interface Inputs {
  email?: string
}

export default function SaveModal({ isOpen, closeModal, mode }: Props) {
  const [isAlreadySavedSimulationUpdated, setIsAlreadySavedSimulationUpdated] =
    useState(false)

  const currentSimulation = useCurrentSimulation()

  const { t } = useClientTranslation()

  const { currentQuestion } = useFormState()

  const { user, updateEmail } = useUser()

  const { register, handleSubmit, setError } = useReactHookForm<Inputs>({
    defaultValues: { email: user.email },
  })

  const { saveSimulation, isPending, isSuccess, isError } = useSaveSimulation()

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // If the mutation is pending, we do nothing
    if (isPending) {
      return
    }

    // Inputs validation
    if (!data.email || !isEmailValid(data.email)) {
      setError('email', {
        message: t('Veuillez entrer une adresse e-mail valide.'),
      })
      return
    }

    updateEmail(data.email)

    // We save the simulation (and signify the backend to send the email)
    saveSimulation({
      simulation: { ...currentSimulation, savedViaEmail: true },
      sendEmail: true,
    })

    trackEvent(confirmSaveSimulationEvent)
    trackPosthogEvent(
      confirmSaveSimulation({
        question: currentQuestion as string,
        // progression is on a 0 to 1 scale
        completionPercentage: currentSimulation?.progression * 100,
      })
    )
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
      saveSimulation({ simulation: currentSimulation })
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

  const router = useRouter()

  // We do not display the component if we are in an iframeSimulation context
  const { isIframeOnlySimulation } = useIframe()
  if (isIframeOnlySimulation) return null

  return (
    <Modal
      isOpen={isOpen}
      ariaLabel={t(
        'simulateur.saveModal.title',
        'Fenêtre modale de sauvegarde de test'
      )}
      closeModal={closeModal}
      hasAbortButton={false}
      buttons={
        <>
          {!currentSimulation.savedViaEmail && mode === 'save' ? (
            <Button color="secondary" size="sm" onClick={closeModal}>
              <Trans>Non, merci</Trans>
            </Button>
          ) : (
            <Button
              color="secondary"
              size="sm"
              onClick={() => router.push('/')}>
              <Trans>Revenir à l'accueil</Trans>
            </Button>
          )}
          {currentSimulation.savedViaEmail ? (
            <Button size="sm" onClick={closeModal}>
              Continuer mon test
            </Button>
          ) : (
            <Button
              size="sm"
              type="submit"
              form={'save-form'}
              disabled={isPending}
              className="inline"
              data-testid="save-modal-submit-button">
              <Trans>
                Sauvegarder{' '}
                <span className="hidden lg:inline">ma progression</span>
              </Trans>
            </Button>
          )}
        </>
      }>
      {currentSimulation.savedViaEmail && <ConfirmationMessage />}
      {!currentSimulation.savedViaEmail && (
        <SaveSimulationForm
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          register={register}
          isError={isError}
          title={
            mode === 'backHome' ? (
              <Trans>Revenir à l'accueil</Trans>
            ) : (
              <Trans>Reprendre plus tard</Trans>
            )
          }
        />
      )}
    </Modal>
  )
}
