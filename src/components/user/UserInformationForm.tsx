'use client'

import Trans from '@/components/translation/Trans'
import {
  LIST_MAIN_NEWSLETTER,
  LIST_NOS_GESTES_LOGEMENT_NEWSLETTER,
  LIST_NOS_GESTES_TRANSPORT_NEWSLETTER,
} from '@/constants/brevo'
import Button from '@/design-system/inputs/Button'
import CheckboxInputGroup from '@/design-system/inputs/CheckboxInputGroup'
import TextInputGroup from '@/design-system/inputs/TextInputGroup'
import Loader from '@/design-system/layout/Loader'
import Emoji from '@/design-system/utils/Emoji'
import { displayErrorToast } from '@/helpers/toasts/displayErrorToast'
import { displaySuccessToast } from '@/helpers/toasts/displaySuccessToast'
import { useGetNewsletterSubscriptions } from '@/hooks/settings/useGetNewsletterSubscriptions'
import { useUpdateUserSettings } from '@/hooks/settings/useUpdateUserSettings'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useUser } from '@/publicodes-state'
import { ReactNode, useEffect, useRef } from 'react'
import { SubmitHandler, useForm as useReactHookForm } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

type Inputs = {
  name: string
  email?: string
  'newsletter-saisonniere': boolean
  'newsletter-transports': boolean
  'newsletter-logement': boolean
}

type Props = {
  title: string | ReactNode
  inputsDisplayed?: Array<
    | 'name'
    | 'email'
    | 'newsletter-saisonniere'
    | 'newsletter-transports'
    | 'newsletter-logement'
  >
  submitLabel?: string | ReactNode
  onCompleted?: (props: Record<string, unknown>) => void
  className?: string
  shouldForceEmailEditable?: boolean
  defaultValues?: {
    'newsletter-transports': boolean
  }
}

export default function UserInformationForm({
  title,
  inputsDisplayed = [
    'name',
    'email',
    'newsletter-saisonniere',
    'newsletter-transports',
    'newsletter-logement',
  ],
  submitLabel,
  onCompleted = () => {},
  className,
  shouldForceEmailEditable = false,
  defaultValues,
}: Props) {
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
    if (!newsletterSubscriptions && !defaultValues) return

    setValue(
      'newsletter-saisonniere',
      newsletterSubscriptions?.includes(LIST_MAIN_NEWSLETTER)
    )
    setValue(
      'newsletter-transports',
      newsletterSubscriptions?.includes(LIST_NOS_GESTES_TRANSPORT_NEWSLETTER) ||
        defaultValues?.['newsletter-transports']
    )
    setValue(
      'newsletter-logement',
      newsletterSubscriptions?.includes(LIST_NOS_GESTES_LOGEMENT_NEWSLETTER)
    )
  }, [newsletterSubscriptions, setValue, defaultValues])

  const { mutateAsync: updateUserSettings, isPending } = useUpdateUserSettings({
    email: user?.email ?? '',
    userId: user?.userId,
  })

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const newsletterIds = {
      [LIST_MAIN_NEWSLETTER]: data['newsletter-saisonniere'],
      [LIST_NOS_GESTES_TRANSPORT_NEWSLETTER]: data['newsletter-transports'],
      [LIST_NOS_GESTES_LOGEMENT_NEWSLETTER]: data['newsletter-logement'],
    }

    try {
      await updateUserSettings({
        name: data.name,
        email: data.email,
        newsletterIds,
      })

      if (data.email && (!user?.email || shouldForceEmailEditable)) {
        updateEmail(data.email)
      }

      if (data.name) {
        updateName(data.name)
      }

      displaySuccessToast(t('Vos informations ont bien été mises à jour.'))

      timeoutRef.current = setTimeout(() => {
        onCompleted(data)
      }, 2500)
    } catch (error) {
      displayErrorToast(t('Une erreur est survenue. Veuillez réessayer.'))
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
    <div className={twMerge('flex flex-col items-start', className)}>
      {title}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col items-start gap-4">
        {inputsDisplayed.includes('name') && (
          <TextInputGroup
            value={user?.name}
            label={t('Votre nom')}
            {...register('name', {
              required: user?.name ? t('Ce champ est requis.') : false,
            })}
            error={errors.name?.message}
          />
        )}

        {inputsDisplayed.includes('email') && (
          <>
            {
              // On affiche le champ email en lecture seule si l'utilisateur a un email de défini
              // sinon on lui permet d'en définir un
              user?.email && !shouldForceEmailEditable ? (
                <TextInputGroup
                  name="email"
                  helperText={<Trans>Ce champ n'est pas modifiable</Trans>}
                  label={t('Votre adresse email')}
                  value={user?.email}
                  readOnly
                />
              ) : (
                <TextInputGroup
                  label={t('Votre adresse email')}
                  className="w-full"
                  value={user?.email ?? ''}
                  {...register('email')}
                />
              )
            }
          </>
        )}

        <h3 className="mb-0 mt-6">
          <Trans>Inscription à nos e-mails</Trans>
        </h3>

        <p className="text-sm text-gray-600">
          <Trans>Vous pouvez vous désincrire à tout moment</Trans>
        </p>
        {inputsDisplayed.includes('newsletter-saisonniere') && (
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
        )}
        {inputsDisplayed.includes('newsletter-transports') && (
          <CheckboxInputGroup
            size="lg"
            label={
              <span>
                <Emoji>🚗</Emoji>{' '}
                <Trans>
                  <strong>Nos Gestes Transports</strong> : tout savoir ou
                  presque sur l'impact carbone des transports, en 4 e-mails
                </Trans>
              </span>
            }
            {...register('newsletter-transports')}
          />
        )}
        {inputsDisplayed.includes('newsletter-logement') && (
          <CheckboxInputGroup
            size="lg"
            label={
              <span>
                <Emoji>🏡</Emoji>{' '}
                <Trans>
                  <strong>Nos Gestes Logement</strong> : informez-vous sur
                  l'impact carbone du logement, en quelques e-mails
                </Trans>
              </span>
            }
            {...register('newsletter-logement')}
          />
        )}

        <div>
          <Button
            type="submit"
            className="mt-6 gap-2 self-start"
            disabled={isPending}>
            {isPending && <Loader size="sm" color="light" />}

            {submitLabel ?? <Trans>Mettre à jour mes informations</Trans>}
          </Button>
        </div>
      </form>
    </div>
  )
}
