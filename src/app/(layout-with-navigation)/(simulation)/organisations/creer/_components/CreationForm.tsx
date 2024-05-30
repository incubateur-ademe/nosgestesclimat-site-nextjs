'use client'

import Trans from '@/components/translation/Trans'
import { ORGANISATION_TYPES } from '@/constants/organisations/organisationTypes'
import Button from '@/design-system/inputs/Button'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import CheckboxInputGroup from '@/design-system/inputs/CheckboxInputGroup'
import Select from '@/design-system/inputs/Select'
import TextInputGroup from '@/design-system/inputs/TextInputGroup'
import { usePreventNavigation } from '@/hooks/navigation/usePreventNavigation'
import { useSendOrganisationCreationEmail } from '@/hooks/organisations/useSendOrganisationCreationEmail'
import { useUpdateOrganisation } from '@/hooks/organisations/useUpdateOrganisation'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useUser } from '@/publicodes-state'
import { captureException } from '@sentry/react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useForm as useReactHookForm } from 'react-hook-form'

type Inputs = {
  name: string
  organisationType: string
  administratorName: string
  hasOptedInForCommunications: boolean
  shouldNavigateToPollForm?: boolean
}

export default function CreationForm() {
  const [pathToNavigateTo, setPathToNavigate] = useState('')

  const { user, updateUserOrganisation } = useUser()

  const { handleUpdateShouldPreventNavigation } = usePreventNavigation()

  const { t } = useClientTranslation()

  const router = useRouter()

  const { register, handleSubmit, formState, watch } = useReactHookForm<Inputs>(
    {
      defaultValues: {
        organisationType: '',
      },
    }
  )

  const { mutateAsync: updateOrganisation, isError: isErrorUpdateOrga } =
    useUpdateOrganisation({
      email: user?.organisation?.administratorEmail ?? '',
    })

  const { mutate: sendCreationConfirmationEmail, isError: isErrorSendEmail } =
    useSendOrganisationCreationEmail()

  async function onSubmit({
    shouldNavigateToPollForm = true,
    name,
    administratorName,
    organisationType,
    hasOptedInForCommunications,
  }: Inputs) {
    try {
      const organisationUpdated = await updateOrganisation({
        name,
        administratorName,
        hasOptedInForCommunications,
        organisationType,
      })

      // Send email
      sendCreationConfirmationEmail({
        organisation: organisationUpdated,
        administratorName,
        email: user?.organisation?.administratorEmail ?? '',
      })

      handleUpdateShouldPreventNavigation(false)

      updateUserOrganisation({
        name,
        slug: organisationUpdated?.slug,
      })

      if (shouldNavigateToPollForm) {
        setPathToNavigate(
          `/organisations/${organisationUpdated?.slug}/creer-campagne`
        )
      } else {
        setPathToNavigate(`/organisations/${organisationUpdated?.slug}`)
      }
    } catch (error: any) {
      captureException(error)
    }
  }

  const userOrgaSlugRef = useRef('')

  // Redirect to organisation page if user has already an organisation
  useEffect(() => {
    if (user?.organisation?.slug) {
      router.push(`/organisations/${user?.organisation?.slug}`)
    }
  }, [router, user?.organisation?.slug])

  // Handle redirection after submitting the form
  useEffect(() => {
    if (!pathToNavigateTo) return

    if (
      (userOrgaSlugRef.current || user?.organisation?.slug) &&
      userOrgaSlugRef.current === user?.organisation?.slug
    )
      return

    router.push(pathToNavigateTo)
  }, [router, pathToNavigateTo, user?.organisation?.slug])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <TextInputGroup
          className="col-span-1"
          label={<Trans>Votre organisation</Trans>}
          error={formState.errors.name?.message}
          {...register('name', {
            required: t('Vous devez renseigner le nom de votre organisation'),
          })}
        />

        <div>
          <Select
            label={
              <p className="mb-0 flex justify-between">
                <Trans>Type d'organisation</Trans>{' '}
                <span className="font-bold italic text-secondary-700">
                  {' '}
                  <Trans>facultatif</Trans>
                </span>
              </p>
            }
            {...register('organisationType')}>
            {ORGANISATION_TYPES.map((type) => (
              <option className="cursor-pointer" key={type} value={type}>
                {type}
              </option>
            ))}
          </Select>

          {watch('organisationType') === ORGANISATION_TYPES[5] && (
            <div className="mt-4 rounded-xl bg-gray-100 p-4 text-sm">
              <p className="mb-2">
                <Trans>
                  Le mode organisation est un mode <strong>100% anonyme</strong>{' '}
                  pour les participants.
                </Trans>
              </p>

              <p className="mb-4">
                <Trans>
                  Avez-vous essayé{' '}
                  <strong>notre fonctionnalité “Groupes d’amis”</strong> ? Elle
                  vous permettra de vous comparer dans un classement : que celui
                  ou celle ayant la plus faible empreinte gagne !
                </Trans>
              </p>
              <ButtonLink href="/amis/creer" size="sm">
                <Trans>Créer un groupe d'amis</Trans>
              </ButtonLink>
            </div>
          )}
        </div>

        <TextInputGroup
          className="col-span-1"
          label={<Trans>Votre nom</Trans>}
          error={formState.errors.administratorName?.message}
          {...register('administratorName', {
            required: t('Vous devez renseigner votre nom'),
          })}
        />
      </div>

      {(isErrorUpdateOrga || isErrorSendEmail) && (
        <div className="mt-4 rounded-xl bg-red-100 p-4 text-red-800">
          <Trans>Une erreur est survenue, veuillez réessayer.</Trans>
        </div>
      )}

      <div className="mt-4 w-full md:w-1/2">
        <CheckboxInputGroup
          size="xl"
          label={
            <span>
              <strong>
                <Trans>
                  Recevoir ponctuellement par email les nouveaux services Nos
                  Gestes Climat aux organisations
                </Trans>
              </strong>{' '}
              <Trans>(une fois par mois maximum !)</Trans>
            </span>
          }
          {...register('hasOptedInForCommunications')}
        />
      </div>

      <div className="mt-12 flex w-full gap-4">
        <Button
          color="secondary"
          type="button"
          onClick={handleSubmit(
            async (props) =>
              await onSubmit({ ...props, shouldNavigateToPollForm: false })
          )}>
          <Trans>Accéder à mon espace</Trans>
        </Button>

        <Button type="submit">
          <Trans>Créer ma première campagne</Trans>
        </Button>
      </div>
    </form>
  )
}
