'use client'

import { SIGNIN_MODE, SIGNUP_MODE } from '@/constants/authentication/modes'
import {
  captureClickTab,
  tabTrackEvent,
} from '@/constants/tracking/pages/signin'
import { CONNEXION_PATH, INSCRIPTION_PATH } from '@/constants/urls/paths'
import Tabs, { type TabItem } from '@/design-system/layout/Tabs'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import type { AuthenticationMode } from '@/types/authentication'
import { trackEvent, trackPosthogEvent } from '@/utils/analytics/trackEvent'
import { useRouter } from 'next/navigation'
import Trans from '../translation/trans/TransClient'

type Props = {
  mode: AuthenticationMode
  className?: string
}

export default function SigninSignupTabs({ mode, className }: Props) {
  const router = useRouter()
  const { t } = useClientTranslation()
  const tabItems: TabItem[] = [
    {
      id: 'connexion',
      label: <Trans i18nKey="login.list.login.label">Connexion</Trans>,
      href: CONNEXION_PATH,
      isActive: mode === SIGNIN_MODE,
      onClick: (e: React.MouseEvent) => {
        e.preventDefault()
        if (mode !== SIGNIN_MODE) {
          trackEvent(tabTrackEvent('connexion'))
          trackPosthogEvent(captureClickTab({ tab: 'connexion' }))
          router.push(CONNEXION_PATH)
        }
      },
      tab: 'connexion',
    },
    {
      id: 'inscription',
      label: <Trans i18nKey="login.list.signin.label">Inscription</Trans>,
      href: INSCRIPTION_PATH,
      isActive: mode === SIGNUP_MODE,
      onClick: (e: React.MouseEvent) => {
        e.preventDefault()
        if (mode !== SIGNUP_MODE) {
          trackEvent(tabTrackEvent('inscription'))
          trackPosthogEvent(captureClickTab({ tab: 'inscription' }))
          router.push(INSCRIPTION_PATH)
        }
      },
      tab: 'inscription',
    },
  ]

  return (
    <div className={className}>
      <Tabs
        items={tabItems}
        ariaLabel={t(
          'navigation.connexionInscription',
          'Navigation connexion/inscription'
        )}
      />
    </div>
  )
}
