'use client'

import OrganisationFetchError from '@/components/organisations/OrganisationFetchError'
import OrganisationLoader from '@/components/organisations/OrganisationLoader'
import Trans from '@/components/translation/trans/TransClient'
import { ADMINISTRATOR_SEPARATOR } from '@/constants/organisations/administrator'
import { OrganisationTypeEnum } from '@/constants/organisations/organisationTypes'
import { organisationsParametersUpdateInformations } from '@/constants/tracking/pages/organisationsParameters'
import Form from '@/design-system/form/Form'
import Separator from '@/design-system/layout/Separator'
import Title from '@/design-system/layout/Title'
import useFetchOrganisation from '@/hooks/organisations/useFetchOrganisation'
import { useUpdateOrganisation } from '@/hooks/organisations/useUpdateOrganisation'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { usePostVerificationCode } from '@/hooks/verification-codes/useCreateVerificationCode'
import { useUser } from '@/publicodes-state'
import type {
  Organisation,
  OrgaSettingsInputsType,
} from '@/types/organisations'
import { trackEvent } from '@/utils/analytics/trackEvent'
import { formatEmail } from '@/utils/format/formatEmail'
import { captureException } from '@sentry/nextjs'
import { useEffect, useRef, useState } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { useForm as useReactHookForm } from 'react-hook-form'
import EmailVerificationModal from './_components/EmailVerificationModal'
import OrganisationFields from './_components/OrganisationFields'
import PersonalInfoFields from './_components/PersonalInfoFields'
import DeconnexionButton from './DeconnexionButton'

const getFormDefaultValues = (
  organisation?: Organisation
): OrgaSettingsInputsType | undefined => {
  if (!organisation) {
    return
  }

  const {
    administrators: [
      {
        email,
        optedInForCommunications,
        position,
        name: administratorName,
        telephone: administratorTelephone,
      },
    ],
    numberOfCollaborators,
    type: organisationType,
    name,
  } = organisation

  const [administratorFirstName, administratorLastName] =
    administratorName?.split(ADMINISTRATOR_SEPARATOR) ?? []

  return {
    name,
    email,
    numberOfCollaborators: numberOfCollaborators ?? 0,
    hasOptedInForCommunications: optedInForCommunications ?? false,
    organisationType: organisationType ?? OrganisationTypeEnum.other,
    ...(position ? { position } : {}),
    ...(administratorName
      ? {
          administratorFirstName,
          administratorLastName,
        }
      : {}),
    ...(administratorTelephone ? { administratorTelephone } : {}),
  }
}

export default function ParametresPage() {
  const { user, updateUserOrganisation } = useUser()
  const [error, setError] = useState<string>('')
  const [shouldDisplayModal, setShouldDisplayModal] = useState<boolean>(false)
  const [dataTemporarySaved, setDataTemporarySaved] =
    useState<OrgaSettingsInputsType>()

  const { t } = useClientTranslation()

  const { data: organisation, isError, isLoading } = useFetchOrganisation()

  const {
    mutateAsync: updateOrganisation,
    error: errorUpdate,
    isSuccess: isSuccessUpdate,
    isPending: isPendingUpdate,
  } = useUpdateOrganisation()

  const { mutateAsync: createVerificationCode, isError: isErrorSendCode } =
    usePostVerificationCode()

  const defaultValues = getFormDefaultValues(organisation)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useReactHookForm({
    defaultValues,
  })

  function handleSaveDataForVerification(data: OrgaSettingsInputsType) {
    setDataTemporarySaved(data)
    setShouldDisplayModal(true)
    createVerificationCode({
      email: data.email,
      userId: user.userId,
    })
  }

  const handleUpdateOrganisation: SubmitHandler<
    OrgaSettingsInputsType
  > = async (formData) => {
    if (!organisation?.slug) {
      return
    }

    const formattedEmail = formatEmail(formData.email)
    // Switch to the update email user flow
    if (formattedEmail !== user?.organisation?.administratorEmail) {
      handleSaveDataForVerification({
        ...formData,
        email: formattedEmail,
      })
      return
    }

    try {
      trackEvent(organisationsParametersUpdateInformations)

      await updateOrganisation({
        organisationIdOrSlug: organisation.slug,
        formData,
      })
    } catch (error) {
      setError(t('Une erreur est survenue. Veuillez réessayer.'))
      captureException(error)
    }
  }

  function closeModal() {
    setShouldDisplayModal(false)
  }

  const timeoutRef = useRef<NodeJS.Timeout>(undefined)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  async function handleVerifyCodeAndSaveModifications(
    verificationCode: string
  ) {
    if (
      !organisation?.slug ||
      !dataTemporarySaved ||
      verificationCode?.length < 6
    )
      return

    await updateOrganisation({
      organisationIdOrSlug: organisation.slug,
      formData: dataTemporarySaved,
      code: verificationCode,
    })

    setShouldDisplayModal(false)

    // BUG : without a timeout, the organisation is not modified (weird I know)
    timeoutRef.current = setTimeout(() => {
      updateUserOrganisation({
        administratorEmail: dataTemporarySaved?.email ?? '',
      })
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
    <div className="pb-12">
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

        {isSuccessUpdate && (
          <p className="mt-4 mb-0 text-green-700">
            <Trans>Vos informations ont bien été mises à jour.</Trans>
          </p>
        )}
      </Form>

      {shouldDisplayModal && (
        <EmailVerificationModal
          closeModal={closeModal}
          onSubmit={handleVerifyCodeAndSaveModifications}
          error={errorUpdate}
          isSuccess={isSuccessUpdate}
          isPending={isPendingUpdate}
          isErrorSendCode={isErrorSendCode}
        />
      )}

      <Separator className="my-8" />

      <DeconnexionButton />
    </div>
  )
}
