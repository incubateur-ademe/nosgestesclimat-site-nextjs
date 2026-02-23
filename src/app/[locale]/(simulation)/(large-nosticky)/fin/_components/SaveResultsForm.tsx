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
import { useLocale } from '@/hooks/useLocale'
import type { Locale } from '@/i18nConfig'
import { useCurrentSimulation, useUser } from '@/publicodes-state'
import { trackEvent, trackPosthogEvent } from '@/utils/analytics/trackEvent'
import { useMutation } from '@tanstack/react-query'

export default function SaveResultsForm() {
  const currentSimulation = useCurrentSimulation()
  const locale = useLocale()

  const { user } = useUser()

  const saveSimulationMutation = useMutation({
    mutationFn: async ({ code, email }: { code: string; email: string }) => {
      trackEvent(saveResultsAndSigninSignUpComplete)
      trackPosthogEvent(captureSaveResultsAndSigninSignUpComplete)

      if (!user.userId) {
        throw new Error('User ID is required')
      }

      await postSimulation({
        simulation: currentSimulation,
        sendEmail: true,
        userId: user.userId,
        locale: locale as Locale,
        code,
        email,
      })

      return { userId: user.userId, email }
    },
  })

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
        redirectURL={`${MON_ESPACE_PATH}?${SHOW_WELCOME_BANNER_QUERY_PARAM}=true`}
        verificationMutation={saveSimulationMutation}
        verificationClassName="p-0 md:p-0 border-t border-primary-500 rounded-none pt-6!"
      />
    </div>
  )
}
