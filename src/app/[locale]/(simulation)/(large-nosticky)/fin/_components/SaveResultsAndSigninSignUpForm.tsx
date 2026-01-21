'use client'

import AuthenticateUserForm from '@/components/AuthenticateUserForm'
import Confirmation from '@/components/results/carbone/getResultsByEmail/Confirmation'
import Trans from '@/components/translation/trans/TransClient'
import {
  captureSaveResultsAndSigninSignUpComplete,
  saveResultsAndSigninSignUpComplete,
} from '@/constants/tracking/pages/end'
import { SHOW_WELCOME_BANNER_QUERY_PARAM } from '@/constants/urls/params'
import { MON_ESPACE_PATH } from '@/constants/urls/paths'
import Card from '@/design-system/layout/Card'
import Title from '@/design-system/layout/Title'
import { postSimulation } from '@/helpers/simulation/postSimulation'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useLocale } from '@/hooks/useLocale'
import type { Locale } from '@/i18nConfig'
import { useCurrentSimulation } from '@/publicodes-state'
import { trackEvent, trackPosthogEvent } from '@/utils/analytics/trackEvent'
import { captureException } from '@sentry/nextjs'
import { useRouter } from 'next/navigation'
import { twMerge } from 'tailwind-merge'

export default function SaveResultsAndSigninSignUpForm({
  className,
}: {
  className?: string
}) {
  const { t } = useClientTranslation()
  const locale = useLocale() as Locale
  const currentSimulation = useCurrentSimulation()

  const router = useRouter()

  const onSubmit = async ({ userId }: { userId: string }) => {
    trackEvent(saveResultsAndSigninSignUpComplete)
    trackPosthogEvent(captureSaveResultsAndSigninSignUpComplete)

    try {
      await postSimulation({
        simulation: {
          ...currentSimulation,
          savedViaEmail: true,
        },
        sendEmail: true,
        userId,
        locale,
      })

      router.push(`${MON_ESPACE_PATH}?${SHOW_WELCOME_BANNER_QUERY_PARAM}=true`)
    } catch (error) {
      captureException(error)
    }
  }

  // If we successfully saved the simulation, we display the confirmation message
  // or if the simulation is already saved
  if (currentSimulation?.savedViaEmail) {
    return <Confirmation className={className} />
  }

  return (
    <div id="email-block" className="mt-6 mb-6">
      <Card
        className={twMerge(
          'flex flex-col items-start gap-2 rounded-xl border-none bg-[#F4F5FB] px-4 pt-6 pb-4 shadow-none md:flex-row md:gap-8 md:py-6',
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
          <AuthenticateUserForm
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
                <Trans>Laissez votre e-mail pour</Trans>{' '}
                <strong>
                  <Trans>sauvegarder</Trans>
                </strong>{' '}
                <Trans>et</Trans>{' '}
                <strong>
                  <Trans>retrouver vos résultats :</Trans>
                </strong>
              </p>
            }
            onComplete={onSubmit}
          />
        </div>
        <img
          className="ml-auto w-48 md:-mt-16 md:ml-0 md:w-80"
          src="https://nosgestesclimat-prod.s3.fr-par.scw.cloud/cms/girl_holding_earth_3373a344b0.svg"
          alt=""
        />
      </Card>
    </div>
  )
}
