'use client'

import VerifyCodeForm from '@/components/AuthenticateUserForm/VerifyCodeForm'
import DefaultErrorAlert from '@/components/error/DefaultErrorAlert'
import Trans from '@/components/translation/trans/TransClient'
import Button from '@/design-system/buttons/Button'
import ButtonLink from '@/design-system/buttons/ButtonLink'
import Form from '@/design-system/form/Form'
import EmailInput from '@/design-system/inputs/EmailInput'
import InlineLink from '@/design-system/inputs/InlineLink'
import BlockSkeleton from '@/design-system/layout/BlockSkeleton'
import Title from '@/design-system/layout/Title'
import Modal from '@/design-system/modals/Modal'
import { getLinkToSimulateur } from '@/helpers/navigation/simulateurPages'
import { useCreateVerificationCode } from '@/hooks/authentication/useCreateVerificationCode'
import { usePendingVerification } from '@/hooks/authentication/usePendingVerification'
import { useEndPage } from '@/hooks/navigation/useEndPage'
import { useSaveSimulation } from '@/hooks/simulation/useSaveSimulation'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useCurrentSimulation, useUser } from '@/publicodes-state'
import type { Simulation } from '@/publicodes-state/types'
import { formatEmail } from '@/utils/format/formatEmail'
import { isEmailValid } from '@/utils/isEmailValid'
import { useForm as useReactHookForm } from 'react-hook-form'

interface Inputs {
  email: string
}

export default function EmailForm({
  isAuthenticated,
}: {
  isAuthenticated: boolean
}) {
  const { user } = useUser()
  const { goToEndPage } = useEndPage()
  const currentSimulation = useCurrentSimulation()
  if (isAuthenticated) {
    goToEndPage()
  }
  const handleSaveSimulationAndCreateAccount = ({ email }: Inputs) => {
    email = formatEmail(email)
    if (!email) {
      goToEndPage()
    }
    // If email is not valid
    if (!isEmailValid(email)) {
      setError('email', {
        type: 'validate',
        message: t(
          'Le format de l’adresse electronique saisie n’est pas valide. Le format attendu est nom@exemple.org'
        ),
      })
      return
    }
    createVerificationCode(email)
  }
  const {
    register,
    setError,
    handleSubmit,
    watch,
    formState: { errors },
  } = useReactHookForm<Inputs>({
    defaultValues: {
      email: user?.email,
    },
  })
  const hasFilledEmail = !!watch('email')

  const {
    pendingVerification,
    registerVerification,
    resetVerification,
    completeVerification,
  } = usePendingVerification({
    onComplete: () => {
      goToEndPage()
    },
  })

  const { t } = useClientTranslation()

  const saveSimulation = useSaveSimulation()
  const { createVerificationCode } = useCreateVerificationCode({
    onComplete: registerVerification,
  })

  const pollSlug = currentSimulation.polls?.at(-1)
  const isContest =
    pollSlug && process.env.NEXT_PUBLIC_POLL_CONTEST_SLUGS?.includes(pollSlug)

  return (
    <>
      {pendingVerification && (
        <Modal
          ariaLabel={t(
            'organisations.emailVerificationModal.title',
            "Fenêtre modale de confirmation d'e-mail"
          )}
          isOpen
          closeModal={() => resetVerification()}
          hasAbortCross={false}>
          <VerifyCodeForm
            onRegisterNewVerification={registerVerification}
            email={pendingVerification.email}
            onVerificationCompleted={completeVerification}
            // @ts-expect-error @TOFIX
            verificationMutation={saveSimulation}
            mutationPayload={{
              simulation: currentSimulation as Readonly<Simulation>,
              sendEmail: true,
            }}
          />
        </Modal>
      )}
      <Form onSubmit={handleSubmit(handleSaveSimulationAndCreateAccount)}>
        <Title
          data-testid="tutoriel-title"
          className="text-lg md:text-2xl"
          title={<Trans>Votre adresse electronique</Trans>}
          subtitle={
            <>
              {isContest ? (
                <span>
                  <Trans>
                    Votre e-mail sera utilisé pour le tirage au sort.
                  </Trans>{' '}
                  <InlineLink
                    target="_blank"
                    href="/politique-de-confidentialite">
                    <Trans>En savoir plus</Trans>
                  </InlineLink>
                </span>
              ) : (
                <Trans>
                  Pour conserver vos résultats et les retrouver à l’avenir
                </Trans>
              )}

              <span className="text-secondary-700 ml-2 inline-block font-bold italic">
                <Trans>facultatif</Trans>
              </span>
            </>
          }
        />

        {saveSimulation.isError && <DefaultErrorAlert className="mb-6" />}

        {saveSimulation.isPending && <BlockSkeleton />}

        <>
          <EmailInput error={errors?.email?.message} {...register('email')} />
          <div className="my-8 flex justify-between border-b border-gray-200 pb-8">
            <ButtonLink
              href={getLinkToSimulateur()}
              color="secondary"
              title={t('précédent')}>
              ←
            </ButtonLink>

            <Button
              data-testid="next-button"
              type="submit"
              color={hasFilledEmail ? 'primary' : 'secondary'}>
              {hasFilledEmail ? t('Créer mon compte') : t('Continuer') + ' →'}
            </Button>
          </div>
        </>
      </Form>
    </>
  )
}
