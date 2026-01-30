'use client'
import VerifyCodeForm from '@/components/AuthenticateUserForm/VerifyCodeForm'
import Trans from '@/components/translation/trans/TransClient'
import Form from '@/design-system/form/Form'
import Separator from '@/design-system/layout/Separator'
import Modal from '@/design-system/modals/Modal'
import { useCreateVerificationCode } from '@/hooks/authentication/useCreateVerificationCode'
import { usePendingVerification } from '@/hooks/authentication/usePendingVerification'
import { useUpdateOrganisation } from '@/hooks/organisations/useUpdateOrganisation'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import type { OrgaSettingsInputsType } from '@/types/organisations'
import { formatEmail } from '@/utils/format/formatEmail'
import { captureException } from '@sentry/nextjs'
import {
  type SubmitHandler,
  useForm as useReactHookForm,
} from 'react-hook-form'
import OrganisationFields from './OrganisationFields'
import PersonalInfoFields from './PersonalInfoFields'

export default function OrganisationForm({
  defaultValues,
  slug,
}: {
  defaultValues: OrgaSettingsInputsType
  slug: string
}) {
  const { t } = useClientTranslation()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useReactHookForm({
    defaultValues,
  })
  const formData = watch()

  const {
    pendingVerification,
    registerVerification,
    resetVerification,
    completeVerification,
  } = usePendingVerification({})

  // @TODO : handle error code
  const { createVerificationCode } = useCreateVerificationCode({
    onComplete: registerVerification,
  })

  const updateOrganisation = useUpdateOrganisation()

  const handleUpdateOrganisation: SubmitHandler<
    OrgaSettingsInputsType
  > = async (formData) => {
    const nextEmail = formatEmail(formData.email)
    // Switch to the update email user flow
    if (nextEmail !== defaultValues.email) {
      await createVerificationCode(nextEmail)
      return
    }
    try {
      await updateOrganisation.mutateAsync({
        organisationIdOrSlug: slug,
        formData,
      })
    } catch (error) {
      captureException(error)
    }
  }

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
            verificationMutation={updateOrganisation}
            mutationPayload={{ organisationIdOrSlug: slug, formData }}
          />
        </Modal>
      )}
      <Form
        className="mt-8 mb-4"
        onSubmit={handleSubmit(handleUpdateOrganisation)}>
        <h2>
          <Trans>Votre organisation</Trans>
        </h2>

        <OrganisationFields
          defaultValues={defaultValues}
          register={register}
          errors={errors}
        />

        <Separator className="my-6" />

        <h2 className="mt-6">
          <Trans>Vos informations personnelles</Trans>
        </h2>

        <PersonalInfoFields defaultValues={defaultValues} register={register} />

        {updateOrganisation.isSuccess && (
          <p className="mt-4 mb-0 text-green-700" data-testid="success-message">
            <Trans>Vos informations ont bien été mises à jour.</Trans>
          </p>
        )}
      </Form>
    </>
  )
}
