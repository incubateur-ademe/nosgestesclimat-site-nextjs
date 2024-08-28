'use client'

import MaxWidthContent from '@/components/layout/MaxWidthContent'
import OrganisationFetchError from '@/components/organisations/OrganisationFetchError'
import OrganisationLoader from '@/components/organisations/OrganisationLoader'
import Trans from '@/components/translation/Trans'
import { organisationsParametersUpdateInformations } from '@/constants/tracking/pages/organisationsParameters'
import Form from '@/design-system/form/Form'
import Separator from '@/design-system/layout/Separator'
import Title from '@/design-system/layout/Title'
import { displaySuccessToast } from '@/helpers/toasts/displaySuccessToast'
import useFetchOrganisation from '@/hooks/organisations/useFetchOrganisation'
import { useSendVerificationCodeWhenModifyingEmail } from '@/hooks/organisations/useSendVerificationCodeWhenModifyingEmail'
import { useUpdateOrganisation } from '@/hooks/organisations/useUpdateOrganisation'
import { useVerifyCodeAndUpdate } from '@/hooks/organisations/useVerifyCodeAndUpdate'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useUser } from '@/publicodes-state'
import { OrgaSettingsInputsType } from '@/types/organisations'
import { formatEmail } from '@/utils/format/formatEmail'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { useEffect, useRef, useState } from 'react'
import { SubmitHandler, useForm as useReactHookForm } from 'react-hook-form'
import DeconnexionButton from './DeconnexionButton'
import EmailVerificationModal from './_components/EmailVerificationModal'
import OrganisationFields from './_components/OrganisationFields'
import PersonalInfoFields from './_components/PersonalInfoFields'

export default function ParametresPage() {
  const { user, updateUserOrganisation } = useUser()
  const [error, setError] = useState<string>('')
  const [shouldDisplayModal, setShouldDisplayModal] = useState<boolean>(false)
  const [dataTemporarySaved, setDataTemporarySaved] =
    useState<OrgaSettingsInputsType>()

  const { t } = useClientTranslation()

  const {
    data: organisation,
    isError,
    isLoading,
  } = useFetchOrganisation({
    email: user?.organisation?.administratorEmail ?? '',
  })

  const { mutateAsync: updateOrganisation } = useUpdateOrganisation({
    email: user?.organisation?.administratorEmail ?? '',
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useReactHookForm({
    defaultValues: organisation
      ? {
          name: organisation?.name ?? '',
          administratorName: organisation?.administrators?.[0]?.name ?? '',
          hasOptedInForCommunications:
            organisation?.administrators?.[0]?.hasOptedInForCommunications ??
            false,
          organisationType: organisation?.organisationType ?? '',
          email: organisation?.administrators?.[0]?.email ?? '',
          position: organisation?.administrators?.[0]?.position ?? '',
          numberOfCollaborators: organisation?.numberOfCollaborators ?? 0,
          administratorTelephone:
            organisation?.administrators?.[0]?.telephone ?? '',
        }
      : undefined,
  })

  const {
    mutateAsync: verifyCodeAndUpdateOrganisation,
    error: errorVerifyAndUpdate,
    isSuccess: isSuccessVerifyAndUpdate,
    isPending: isPendingVerifyAndUpdate,
  } = useVerifyCodeAndUpdate(user?.organisation?.administratorEmail ?? '')

  const { mutate: sendVerificationCode, isError: isErrorSendCode } =
    useSendVerificationCodeWhenModifyingEmail(
      user?.organisation?.administratorEmail ?? ''
    )

  function handleSaveDataForVerification(data: OrgaSettingsInputsType) {
    setDataTemporarySaved(data)
    setShouldDisplayModal(true)
    sendVerificationCode({
      email: data?.email ?? '',
      previousEmail: user?.organisation?.administratorEmail ?? '',
    })
  }

  const handleUpdateOrganisation: SubmitHandler<
    OrgaSettingsInputsType
  > = async ({
    email,
    name,
    organisationType,
    numberOfCollaborators,
    position,
    administratorName,
    administratorTelephone,
    hasOptedInForCommunications,
  }) => {
    const formattedEmail = formatEmail(email)
    // Switch to the update email user flow
    if (formattedEmail !== user?.organisation?.administratorEmail) {
      handleSaveDataForVerification({
        email: formattedEmail,
        name,
        organisationType,
        numberOfCollaborators,
        position,
        administratorName,
        hasOptedInForCommunications,
        administratorTelephone,
      })
      return
    }

    try {
      trackEvent(organisationsParametersUpdateInformations)

      await updateOrganisation({
        name,
        organisationType,
        numberOfCollaborators,
        position,
        administratorName,
        hasOptedInForCommunications,
        administratorTelephone,
      })

      displaySuccessToast(t('Vos informations ont bien été mises à jour.'))
    } catch (error) {
      setError(t('Une erreur est survenue. Veuillez réessayer.'))
    }
  }

  function closeModal() {
    setShouldDisplayModal(false)
  }

  const timeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  async function handleVerifyCodeAndSaveModifications(
    verificationCode: string
  ) {
    if (verificationCode?.length < 6) return

    await verifyCodeAndUpdateOrganisation({
      ...dataTemporarySaved,
      email: user?.organisation?.administratorEmail ?? '',
      emailModified: dataTemporarySaved?.email ?? '',
      verificationCode,
    })

    displaySuccessToast(t('Vos informations ont bien été mises à jour.'))

    // BUG : without a timeout, the organisation is not modified (weird I know)
    timeoutRef.current = setTimeout(() => {
      updateUserOrganisation({
        administratorEmail: dataTemporarySaved?.email ?? '',
      })

      closeModal()
    }, 100)
  }

  if (isLoading || (!organisation && !isError)) {
    return <OrganisationLoader />
  }

  if (isError && !isLoading && !organisation) {
    return (
      <OrganisationFetchError organisation={organisation} isError={isError} />
    )
  }

  return (
    <MaxWidthContent className="pb-8">
      <Title
        title={
          <span>
            <Trans>Paramètres de </Trans>
            <strong className="text-primary-700">{organisation?.name}</strong>
          </span>
        }
      />

      <Form
        error={error}
        className="mb-4 mt-8"
        onSubmit={handleSubmit(handleUpdateOrganisation)}>
        <h2>
          <Trans>Votre organisation</Trans>
        </h2>

        <OrganisationFields
          organisation={organisation}
          register={register}
          errors={errors}
        />

        <Separator className="my-6" />

        <h2 className="mt-6">
          <Trans>Vos informations personnelles</Trans>
        </h2>

        <PersonalInfoFields
          organisation={organisation}
          register={register as any}
        />
      </Form>

      {shouldDisplayModal && (
        <EmailVerificationModal
          closeModal={closeModal}
          onSubmit={handleVerifyCodeAndSaveModifications}
          error={errorVerifyAndUpdate}
          isSuccess={isSuccessVerifyAndUpdate}
          isPending={isPendingVerifyAndUpdate}
          isErrorSendCode={isErrorSendCode}
        />
      )}

      <Separator className="my-4" />

      <DeconnexionButton organisation={organisation} />
    </MaxWidthContent>
  )
}
