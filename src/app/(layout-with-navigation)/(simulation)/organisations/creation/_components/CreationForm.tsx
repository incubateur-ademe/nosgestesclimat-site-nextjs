'use client'

import Trans from '@/components/translation/Trans'
import Button from '@/design-system/inputs/Button'
import CheckboxInputGroup from '@/design-system/inputs/CheckboxInputGroup'
import Select from '@/design-system/inputs/Select'
import TextInputGroup from '@/design-system/inputs/TextInputGroup'
import { usePreventNavigation } from '@/hooks/navigation/usePreventNavigation'
import { useSendOrganisationCreationEmail } from '@/hooks/organisations/useSendOrganisationCreationEmail'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useUser } from '@/publicodes-state'
import { captureException } from '@sentry/react'
import { t } from 'i18next'
import { useRouter } from 'next/navigation'
import { useForm as useReactHookForm } from 'react-hook-form'
import { useUpdateOrganisation } from '../../_hooks/useUpdateOrganisation'

type Inputs = {
  name: string
  organisationType: string
  administratorName: string
  hasOptedInForCommunications: boolean
}

const ORGANISATION_TYPES = [
  t('Entreprise'),
  t('Public ou collectivité territoriale'),
  t('Coopérative'),
  t('Association'),
  t('Université ou école'),
  t("Groupe d'amis"),
  t('Autre'),
]

export default function CreationForm() {
  const { user, updateUserOrganisation } = useUser()

  const { handleUpdateShouldPreventNavigation } = usePreventNavigation()

  const { t } = useClientTranslation()

  const router = useRouter()

  const { register, handleSubmit, formState } = useReactHookForm<Inputs>()

  const { mutateAsync: updateOrganisation } = useUpdateOrganisation({
    email: user?.organisation?.administratorEmail ?? '',
  })

  const { mutate: sendCreationConfirmationEmail } =
    useSendOrganisationCreationEmail()

  async function onSubmit({
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

      if (!organisationUpdated?.slug) {
        throw new Error('No slug found')
      }

      handleUpdateShouldPreventNavigation(false)

      updateUserOrganisation({
        name,
        slug: organisationUpdated?.slug,
      })

      router.push(`/organisations/${organisationUpdated?.slug}`)
    } catch (error: any) {
      captureException(error)
    }
  }

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

        <TextInputGroup
          className="col-span-1"
          label={<Trans>Votre nom</Trans>}
          error={formState.errors.administratorName?.message}
          {...register('administratorName', {
            required: t('Vous devez renseigner votre nom'),
          })}
        />
      </div>

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

      <div>
        <Button type="submit" className="mt-12 self-start">
          <Trans>Accéder à mon espace</Trans>
        </Button>
      </div>
    </form>
  )
}
