'use client'

import Trans from '@/components/translation/Trans'
import { EMAIL_PAGE } from '@/constants/infosPages'
import EmailInput from '@/design-system/inputs/EmailInput'
import Title from '@/design-system/layout/Title'
import { fetchHasUserAlreadyParticipated } from '@/helpers/organisations/fetchHasUserAlreadyParticipated'
import { useInfosPage } from '@/hooks/navigation/useInfosPage'
import { useOrganisationQueryParams } from '@/hooks/organisations/useOrganisationQueryParams'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useUser } from '@/publicodes-state'
import { isEmailValid } from '@/utils/isEmailValid'
import { trackPageView } from '@/utils/matomo/trackEvent'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect } from 'react'
import { useForm as useReactHookForm } from 'react-hook-form'
import Navigation from '../_components/Navigation'

type Inputs = {
  email: string
}

export default function Email() {
  const searchParams = useSearchParams()
  const fixedEmail = searchParams.get('fixedemail') ? true : false

  const { user, updateEmail } = useUser()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useReactHookForm<Inputs>({
    defaultValues: {
      email: user?.email || user?.organisation?.administratorEmail || '',
    },
  })

  const { t } = useClientTranslation()

  const router = useRouter()

  const { getLinkToNextInfosPage, getLinkToPrevInfosPage } = useInfosPage()

  const { pollSlug } = useOrganisationQueryParams()

  // We track a page view with the format of the shared link (/o/organisation/poll)
  useEffect(() => {
    trackPageView('/o/orga_slug/poll_slug/')
  }, [])

  const onSubmit = useCallback(
    async ({ email }: Inputs) => {
      // Email is not mandatory
      if (!email) {
        router.push(getLinkToNextInfosPage({ curPage: EMAIL_PAGE }))
        return
      }

      // If email is not valid
      if (!isEmailValid(email)) {
        setError('email', {
          type: 'validate',
          message: t('Veuillez saisir une adresse email valide.'),
        })
        return
      }

      const result = await fetchHasUserAlreadyParticipated({
        pollSlug: pollSlug ?? '',
        userId: user?.userId,
        email,
      })

      if (result?.hasUserAlreadyParticipated) {
        setError('email', {
          message: t('Vous avez déjà participé à ce sondage.'),
          type: 'manual',
        })
        return
      }

      // If email is valid
      updateEmail(email)

      // Go to next page
      router.push(getLinkToNextInfosPage({ curPage: EMAIL_PAGE }))
    },
    [
      pollSlug,
      user?.userId,
      updateEmail,
      router,
      getLinkToNextInfosPage,
      setError,
      t,
    ]
  )

  return (
    <form>
      <Title
        data-cypress-id="tutoriel-title"
        className="text-lg md:text-2xl"
        title={<Trans>Votre adresse email</Trans>}
        subtitle={
          <>
            <Trans>
              Pour conserver vos résultats et les retrouver à l’avenir
            </Trans>
            {!fixedEmail ? (
              <span className="ml-2 inline-block font-bold italic text-secondary-700">
                <Trans>facultatif</Trans>
              </span>
            ) : null}
          </>
        }
      />

      <EmailInput
        readOnly={fixedEmail}
        value={user?.email || user?.organisation?.administratorEmail || ''}
        error={errors?.email?.message}
        {...register('email', {
          pattern: {
            value:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: t('Veuillez entrer une adresse email valide'),
          },
        })}
      />

      <Navigation
        linkToPrev={getLinkToPrevInfosPage({ curPage: EMAIL_PAGE })}
        handleSubmit={handleSubmit(onSubmit)}
        submitDisabled={!getLinkToNextInfosPage({ curPage: EMAIL_PAGE })}
        currentPage={EMAIL_PAGE}
      />
    </form>
  )
}
