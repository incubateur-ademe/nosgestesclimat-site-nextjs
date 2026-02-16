'use client'

import AuthenticateUserForm from '@/components/AuthenticateUserForm'
import Trans from '@/components/translation/trans/TransClient'
import {
  captureSaveResultsAndSigninSignUpComplete,
  saveResultsAndSigninSignUpComplete,
} from '@/constants/tracking/pages/end'
import { SHOW_WELCOME_BANNER_QUERY_PARAM } from '@/constants/urls/params'
import { MON_ESPACE_PATH } from '@/constants/urls/paths'

import { postSimulation } from '@/helpers/simulation/postSimulation'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useLocale } from '@/hooks/useLocale'
import type { Locale } from '@/i18nConfig'
import { useCurrentSimulation } from '@/publicodes-state'
import { trackEvent, trackPosthogEvent } from '@/utils/analytics/trackEvent'
import { captureException } from '@sentry/nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function SaveResultsForm() {
  const [onCompleteError, setOnCompleteError] = useState<string | undefined>(
    undefined
  )

  const { t } = useClientTranslation()

  const currentSimulation = useCurrentSimulation()
  const locale = useLocale()

  const router = useRouter()

  const onSubmit = async ({ userId }: { userId: string }) => {
    trackEvent(saveResultsAndSigninSignUpComplete)
    trackPosthogEvent(captureSaveResultsAndSigninSignUpComplete)

    try {
      await postSimulation({
        simulation: currentSimulation,
        sendEmail: true,
        userId,
        locale: locale as Locale,
      })

      router.push(`${MON_ESPACE_PATH}?${SHOW_WELCOME_BANNER_QUERY_PARAM}=true`)
    } catch (error) {
      captureException(error)
      setOnCompleteError(
        t(
          'Une erreur est survenue lors de la sauvegarde de vos résultats. Veuillez réessayer.'
        )
      )
    }
  }
  return (
    <div className="dark">
      <AuthenticateUserForm
        buttonColor="borderless"
        isVerticalLayout={false}
        buttonLabel={
          <Trans i18nKey="fin.getResultsOnUserProfile.buttonLabel">
            Sauvegarder mes résultats
          </Trans>
        }
        inputLabel={
          <span className="text-white">
            <Trans i18nKey="fin.getResultsOnUserProfile.inputLabel">
              Votre adresse e-mail
            </Trans>
          </span>
        }
        onComplete={onSubmit}
        onCompleteError={onCompleteError}
      />
    </div>
  )
}
