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
import type { VerifiedUser } from '@/types/organisations'
import { trackEvent, trackPosthogEvent } from '@/utils/analytics/trackEvent'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export default function SaveResultsForm() {
  const currentSimulation = useCurrentSimulation()
  const locale = useLocale()

  const router = useRouter()

  const { user } = useUser()

  const saveSimulationMutation = useMutation({
    mutationFn: async ({ code, email }: { code: string; email: string }) => {
      trackEvent(saveResultsAndSigninSignUpComplete)
      trackPosthogEvent(captureSaveResultsAndSigninSignUpComplete)

      await postSimulation({
        simulation: currentSimulation,
        sendEmail: true,
        userId: user?.userId ?? '',
        locale: locale as Locale,
        code,
        email,
      })

      return { userId: user?.userId ?? '', email } as VerifiedUser
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
        onComplete={() => {
          router.push(
            `${MON_ESPACE_PATH}?${SHOW_WELCOME_BANNER_QUERY_PARAM}=true`
          )
        }}
        verificationMutation={saveSimulationMutation}
      />
    </div>
  )
}
