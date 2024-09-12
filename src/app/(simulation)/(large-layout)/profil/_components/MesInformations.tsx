'use client'

import CheckCircleIcon from '@/components/icons/CheckCircleIcon'
import Trans from '@/components/translation/Trans'
import {
  LIST_MAIN_NEWSLETTER,
  LIST_NOS_GESTES_TRANSPORT_NEWSLETTER,
} from '@/constants/brevo'
import Button from '@/design-system/inputs/Button'
import CheckboxInputGroup from '@/design-system/inputs/CheckboxInputGroup'
import TextInputGroup from '@/design-system/inputs/TextInputGroup'
import Loader from '@/design-system/layout/Loader'
import Emoji from '@/design-system/utils/Emoji'
import { useGetNewsletterSubscriptions } from '@/hooks/settings/useGetNewsletterSubscriptions'
import { useUpdateUserSettings } from '@/hooks/settings/useUpdateUserSettings'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useUser } from '@/publicodes-state'
import { formatEmail } from '@/utils/format/formatEmail'
import { useEffect, useRef, useState } from 'react'
import { SubmitHandler, useForm as useReactHookForm } from 'react-hook-form'

type Inputs = {
  name: string
  email?: string
  'newsletter-saisonniere': boolean
  'newsletter-transports': boolean
}

export default function MesInformations() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const { t } = useClientTranslation()

  const { user, updateEmail, updateName } = useUser()

  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useReactHookForm<Inputs>({
    defaultValues: {
      name: user?.name,
    },
  })

  const { data: newsletterSubscriptions } = useGetNewsletterSubscriptions(
    user?.email ?? ''
  )

  useEffect(() => {
    if (!newsletterSubscriptions) return

    setValue(
      'newsletter-saisonniere',
      newsletterSubscriptions.includes(LIST_MAIN_NEWSLETTER)
    )
    setValue(
      'newsletter-transports',
      newsletterSubscriptions.includes(LIST_NOS_GESTES_TRANSPORT_NEWSLETTER)
    )
  }, [newsletterSubscriptions, setValue])

  const {
    mutateAsync: updateUserSettings,
    isPending,
    isError,
  } = useUpdateUserSettings({
    email: user?.email ?? '',
    userId: user?.userId,
  })

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const newsletterIds = {
      [LIST_MAIN_NEWSLETTER]: data['newsletter-saisonniere'],
      [LIST_NOS_GESTES_TRANSPORT_NEWSLETTER]: data['newsletter-transports'],
    }
    try {
      const formattedEmail = formatEmail(data.email)
      await updateUserSettings({
        name: data.name,
        email: formattedEmail,
        newsletterIds,
      })

      if (formattedEmail) {
        updateEmail(formattedEmail)
      }

      if (data.name) {
        updateName(data.name)
      }

      setIsSubmitted(true)

      timeoutRef.current = setTimeout(() => {
        setIsSubmitted(false)
      }, 2500)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <div>
      <h2>
        <Trans>Mes informations</Trans>
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <TextInputGroup
          value={user?.name}
          label={t('Votre nom')}
          {...register('name', {
            required: user?.name ? t('Ce champ est requis.') : false,
          })}
          error={errors.name?.message}
        />

        <TextInputGroup
          type="email"
          helperText={
            user?.email ? <Trans>Ce champ n'est pas modifiable</Trans> : null
          }
          label={t('Votre adresse email')}
          value={user?.email}
          {...register('email')}
          readOnly={user?.email ? true : false}
        />

        <h3 className="mb-0 mt-6">
          <Trans>Inscription à nos e-mails</Trans>
        </h3>

        <p className="text-sm text-gray-600">
          <Trans>Vous pouvez vous désincrire à tout moment</Trans>
        </p>

        <CheckboxInputGroup
          size="lg"
          label={
            <span>
              <Emoji>☀️</Emoji>{' '}
              <Trans>
                <strong>Infolettre saisonnière de Nos Gestes Climat</strong> :
                actualités climat, initiatives positives et nouveautés
              </Trans>
            </span>
          }
          {...register('newsletter-saisonniere')}
        />

        <CheckboxInputGroup
          size="lg"
          label={
            <span>
              <Emoji>🚗</Emoji>{' '}
              <Trans>
                <strong>Nos Gestes Transports</strong> : tout savoir ou presque
                sur l'impact carbone des transports, en 4 e-mails
              </Trans>
            </span>
          }
          {...register('newsletter-transports')}
        />

        <div>
          <Button
            type="submit"
            className="mt-6 gap-2 self-start"
            disabled={isPending || isSubmitted}>
            {isPending && <Loader size="sm" color="light" />}

            <Trans>Mettre à jour mes informations</Trans>
          </Button>

          {isSubmitted && (
            <p className="mt-4 flex items-center text-sm text-green-700">
              <CheckCircleIcon className="mr-2 fill-green-700" />
              <Trans>Modifications sauvegardées</Trans>
            </p>
          )}

          {isError && (
            <p className="mt-4 text-sm text-red-700">
              <Trans>
                Une erreur s'est produite au moment de la sauvegarde de vos
                paramètres
              </Trans>
            </p>
          )}
        </div>
      </form>
    </div>
  )
}
