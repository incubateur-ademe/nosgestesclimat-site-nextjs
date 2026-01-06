'use client'

import { LIST_NOS_GESTES_TRANSPORT_NEWSLETTER } from '@/constants/brevo'
import Button from '@/design-system/buttons/Button'
import TextInput from '@/design-system/inputs/TextInput'
import Loader from '@/design-system/layout/Loader'
import Emoji from '@/design-system/utils/Emoji'
import { useGetNewsletterSubscriptions } from '@/hooks/settings/useGetNewsletterSubscriptions'
import { useUpdateUserSettings } from '@/hooks/settings/useUpdateUserSettings'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useLocale } from '@/hooks/useLocale'
import i18nConfig from '@/i18nConfig'
import { useUser } from '@/publicodes-state'
import type { SubmitHandler } from 'react-hook-form'
import { useForm as useReactHookForm } from 'react-hook-form'
import Trans from '../translation/trans/TransClient'

interface Inputs {
  email: string
}

export default function NosGestesTransportsBanner() {
  const { t } = useClientTranslation()

  const locale = useLocale()

  const { user, updateEmail } = useUser()
  const { register, handleSubmit } = useReactHookForm<Inputs>({
    defaultValues: { email: user?.email },
  })

  const { data: newsletterSubscriptions } = useGetNewsletterSubscriptions(
    user?.userId ?? ''
  )

  const {
    mutateAsync: updateUserSettings,
    isPending,
    isError,
    isSuccess,
  } = useUpdateUserSettings()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await updateUserSettings({
      email: data.email,
      newsletterIds: [LIST_NOS_GESTES_TRANSPORT_NEWSLETTER],
      userId: user?.userId,
      name: user?.name ?? '',
    })

    if (data.email && !user?.email) {
      updateEmail(data.email)
    }
  }

  if (
    newsletterSubscriptions?.includes(LIST_NOS_GESTES_TRANSPORT_NEWSLETTER) ||
    // Hide for non frenchies
    locale !== i18nConfig.defaultLocale
  ) {
    return null
  }

  if (isSuccess) {
    return (
      <div className="bg-transport-50 mt-12 flex w-full flex-wrap rounded-xl p-6 md:flex-nowrap">
        <p className="text-lg" style={{ marginBottom: '0' }}>
          <Trans>
            Votre inscription est validée ! <Emoji>✨</Emoji>
          </Trans>
        </p>
      </div>
    )
  }

  return (
    <div className="bg-transport-50 mt-12 flex w-full flex-wrap items-start gap-4 rounded-xl p-6 md:flex-nowrap">
      <div>
        <p className="text-lg" style={{ marginBottom: '16px' }}>
          <Emoji style={{ marginRight: '8px', fontSize: '2rem' }}>🚲</Emoji>
          <Trans>
            Recevez nos <strong>conseils transports</strong> directement dans
            votre boite mail !
          </Trans>
        </p>
        <p className="text-sm" style={{ marginBottom: '0' }}>
          <Trans>
            Vous accompagner pour mieux agir en{' '}
            <strong className="text-secondary-700">4 mails seulement</strong>.
          </Trans>
        </p>
      </div>

      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full min-w-80 flex-col items-start gap-4">
          <div className="relative w-full">
            <TextInput
              aria-label={t('Votre e-mail')}
              autoComplete="email"
              className="w-full rounded-full pr-16"
              value={user?.email ?? ''}
              placeholder={t('Votre e-mail')}
              error={
                isError
                  ? t('Une erreur est survenue. Veuillez réessayer.')
                  : undefined
              }
              {...register('email', { required: t('Ce champ est requis') })}
            />

            <Button
              disabled={isPending}
              type="submit"
              aria-label={t('Valider')}
              className="absolute top-1/2 right-2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full p-0 leading-none">
              {isPending ? <Loader /> : '→'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
