'use client'

import EmailSigninForm from '@/components/signIn/EmailSigninForm'
import Trans from '@/components/translation/trans/TransClient'
import {
  LIST_MAIN_NEWSLETTER,
  LIST_NOS_GESTES_LOGEMENT_NEWSLETTER,
  LIST_NOS_GESTES_TRANSPORT_NEWSLETTER,
} from '@/constants/brevo'
import { defaultMetric } from '@/constants/model/metric'
import { endClickSaveSimulation } from '@/constants/tracking/pages/end'
import Card from '@/design-system/layout/Card'
import Title from '@/design-system/layout/Title'
import { getListIds } from '@/helpers/brevo/getListIds'
import { useGetNewsletterSubscriptions } from '@/hooks/settings/useGetNewsletterSubscriptions'
import { useUpdateUserSettings } from '@/hooks/settings/useUpdateUserSettings'
import { useSaveSimulation } from '@/hooks/simulation/useSaveSimulation'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useLocale } from '@/hooks/useLocale'
import { useMainNewsletter } from '@/hooks/useMainNewsletter'
import i18nConfig from '@/i18nConfig'
import { useCurrentSimulation, useUser } from '@/publicodes-state'
import { trackEvent } from '@/utils/analytics/trackEvent'
import { formatEmail } from '@/utils/format/formatEmail'
import { captureException } from '@sentry/nextjs'
import { useEffect } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { useForm as useReactHookForm } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import Confirmation from './carbone/getResultsByEmail/Confirmation'

type Inputs = {
  name: string
  email?: string
  'newsletter-saisonniere': boolean
  'newsletter-transports': boolean
  'newsletter-logement': boolean
}

export default function GetResultsOnUserProfile({
  className,
}: {
  className?: string
}) {
  const { t } = useClientTranslation()
  const { user, updateEmail } = useUser()

  const locale = useLocale()

  const currentSimulation = useCurrentSimulation()

  const { data: newsletterSubscriptions } = useGetNewsletterSubscriptions(
    user?.userId ?? ''
  )

  const isSubscribedMainNewsletter =
    newsletterSubscriptions?.includes(LIST_MAIN_NEWSLETTER)

  const isSubscribedTransportNewsletter = newsletterSubscriptions?.includes(
    LIST_NOS_GESTES_TRANSPORT_NEWSLETTER
  )

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useReactHookForm<Inputs>({
    defaultValues: {
      name: user?.name,
    },
    mode: 'onSubmit',
  })

  const isSubscribedLogementNewsletter = newsletterSubscriptions?.includes(
    LIST_NOS_GESTES_LOGEMENT_NEWSLETTER
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

    setValue(
      'newsletter-logement',
      newsletterSubscriptions.includes(LIST_NOS_GESTES_LOGEMENT_NEWSLETTER)
    )
  }, [newsletterSubscriptions, setValue])

  const { saveSimulation, isPending, isSuccess, isError, error } =
    useSaveSimulation()

  const { data: mainNewsletter } = useMainNewsletter()

  const { mutate: updateUserSettings } = useUpdateUserSettings()

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // If the mutation is pending, we do nothing
    if (isPending) {
      return
    }

    trackEvent(endClickSaveSimulation)

    const newsletters = getListIds(data)

    const formattedEmail = formatEmail(data.email)

    updateEmail(formattedEmail)

    if (currentSimulation?.computedResults[defaultMetric].bilan === 0) {
      // Send an error to Sentry
      captureException(
        new Error(
          'GetResultsByEmail: computedResults[defaultMetric].bilan === 0'
        )
      )
      return
    }

    try {
      // Handles saving the simulation and sending the results by email
      saveSimulation({
        simulation: {
          ...currentSimulation,
          savedViaEmail: true,
        },
        sendEmail: true,
      })

      // Handles updating the newsletters subscriptions and sending the subscription confirmation email
      if (newsletters.length > 0) {
        updateUserSettings({
          newsletterIds: newsletters,
          userId: user?.userId,
          email: formattedEmail,
          name: data.name,
        })
      }
    } catch (error) {
      captureException(error)
    }
  }

  useEffect(() => {
    if (isSuccess && !currentSimulation.savedViaEmail) {
      // We update the simulation to signify that it has been saved (and not show the form anymore)
      currentSimulation.update({ savedViaEmail: true })
    }
  }, [isSuccess, currentSimulation])

  const isFrench = locale === i18nConfig.defaultLocale

  // If we successfully saved the simulation, we display the confirmation message
  // or if the simulation is already saved
  if (isSuccess || currentSimulation?.savedViaEmail) {
    return <Confirmation className={className} />
  }

  // There is a padding/margin shenanigan here for the scroll
  return (
    <div id="email-block" className="-mt-40 mb-6 pt-40">
      <Card
        className={twMerge(
          'bg-primary-50 flex flex-col items-start gap-2 rounded-xl border-none px-4 py-6 shadow-none md:flex-row md:gap-8',
          className
        )}>
        <div className="flex-1">
          <Title
            className="text-lg font-bold"
            title={t(
              'fin.getResultsOnUserProfile.title',
              'Retrouvez vos résultats à tout moment sur votre espace personnel'
            )}
          />
          <EmailSigninForm
            buttonLabel={
              <span>
                <span className="text-lg" aria-hidden>
                  →
                </span>{' '}
                <Trans i18nKey="fin.getResultsOnUserProfile.buttonLabel">
                  Sauvegarder mes résultats
                </Trans>
              </span>
            }
            inputLabel={
              <p className="mb-0 font-normal">
                <Trans>Laissez votre email pour</Trans>{' '}
                <strong>
                  <Trans>sauvegarder</Trans>
                </strong>{' '}
                <Trans>et</Trans>{' '}
                <strong>
                  <Trans>retrouver vos résultats :</Trans>
                </strong>
              </p>
            }
          />
        </div>
        <img
          className="-mt-16 w-80"
          src="https://nosgestesclimat-prod.s3.fr-par.scw.cloud/cms/girl_holding_earth_3373a344b0.svg"
          alt=""
        />
      </Card>
    </div>
  )
}
