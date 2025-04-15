'use client'

import Trans from '@/components/translation/trans/TransClient'
import { linkToGroupCreation } from '@/constants/group'
import { ADMINISTRATOR_SEPARATOR } from '@/constants/organisations/administrator'
import {
  ORGANISATION_TYPES,
  OrganisationTypeEnum,
} from '@/constants/organisations/organisationTypes'
import Button from '@/design-system/inputs/Button'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import CheckboxInputGroup from '@/design-system/inputs/CheckboxInputGroup'
import Select from '@/design-system/inputs/Select'
import TextInputGroup from '@/design-system/inputs/TextInputGroup'
import Separator from '@/design-system/layout/Separator'
import { usePreventNavigation } from '@/hooks/navigation/usePreventNavigation'
import { useCreateOrganisation } from '@/hooks/organisations/useCreateOrganisation'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useUser } from '@/publicodes-state'
import { captureException } from '@sentry/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useForm as useReactHookForm } from 'react-hook-form'

type Inputs = {
  name: string
  organisationType: OrganisationTypeEnum
  administratorFirstName: string
  administratorLastName: string
  administratorPosition: string
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
      defaultValues: {},
    }
  )

  const { mutateAsync: createOrganisation, isError: isErrorUpdateOrga } =
    useCreateOrganisation()

  async function onSubmit({
    shouldNavigateToPollForm = true,
    name,
    administratorFirstName,
    administratorLastName,
    administratorPosition,
    organisationType,
    hasOptedInForCommunications,
  }: Inputs) {
    try {
      const organisationUpdated = await createOrganisation({
        name,
        type: organisationType,
        administrators: [
          {
            name: `${administratorFirstName}${ADMINISTRATOR_SEPARATOR}${administratorLastName}`,
            position: administratorPosition,
            optedInForCommunications: hasOptedInForCommunications,
          },
        ],
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
    <form onSubmit={handleSubmit(onSubmit)} className="mb-12">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <TextInputGroup
          className="col-span-1"
          label={<Trans>Votre organisation</Trans>}
          data-cypress-id="organisation-name-input"
          error={formState.errors.name?.message}
          {...register('name', {
            required: t('Ce champ est requis'),
          })}
        />

        <div>
          <Select
            containerClassName="pt-[3px]"
            label={<Trans>Type d'organisation</Trans>}
            data-cypress-id="organisation-type-select"
            error={formState.errors.organisationType?.message}
            {...register('organisationType', {
              required: t('Ce champ est requis'),
            })}>
            {Object.entries(ORGANISATION_TYPES).map(([key, value]) => (
              <option className="cursor-pointer" key={key} value={key}>
                {value}
              </option>
            ))}
          </Select>

          {watch('organisationType') ===
            OrganisationTypeEnum.groupOfFriends && (
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
              <ButtonLink href={linkToGroupCreation} size="sm">
                <Trans>Créer un groupe d'amis</Trans>
              </ButtonLink>
            </div>
          )}
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <TextInputGroup
          className="col-span-1"
          label={<Trans>Votre prénom</Trans>}
          data-cypress-id="organisation-administrator-first-name-input"
          error={formState.errors.administratorFirstName?.message}
          {...register('administratorFirstName', {
            required: t('Ce champ est requis'),
          })}
        />

        <TextInputGroup
          className="col-span-1"
          label={<Trans>Votre nom</Trans>}
          data-cypress-id="organisation-administrator-last-name-input"
          error={formState.errors.administratorLastName?.message}
          {...register('administratorLastName', {
            required: t('Ce champ est requis'),
          })}
        />

        <TextInputGroup
          className="col-span-1"
          data-cypress-id="organisation-administrator-position-input"
          label={
            <p className="mb-0 flex items-center justify-between">
              <Trans>Votre poste</Trans>
              <span className="text-secondary-700 text-sm italic">
                facultatif
              </span>
            </p>
          }
          {...register('administratorPosition')}
        />
      </div>

      {isErrorUpdateOrga && (
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

        <Button type="submit" data-cypress-id="create-organisation-button">
          <Trans>Créer ma première campagne</Trans>
        </Button>
      </div>
    </form>
  )
}
