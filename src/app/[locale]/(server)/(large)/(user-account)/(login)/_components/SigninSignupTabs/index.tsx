'use client'

import Trans from '@/components/translation/trans/TransClient'
import { SIGNIN_MODE, SIGNUP_MODE } from '@/constants/authentication/modes'
import { CONNEXION_PATH, INSCRIPTION_PATH } from '@/constants/urls/paths'
import Tabs, { type TabItem } from '@/design-system/layout/Tabs'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import type { AuthenticationMode } from '@/types/authentication'

interface Props {
  mode: AuthenticationMode
  className?: string
}

export default function SigninSignupTabs({ mode, className }: Props) {
  const { t } = useClientTranslation()

  const tabItems: TabItem[] = [
    {
      id: 'connexion',
      label: <Trans i18nKey="login.list.login.label">Se connecter</Trans>,
      href: CONNEXION_PATH,
      isActive: mode === SIGNIN_MODE,
      tab: 'connexion',
      prefetch: false,
    },
    {
      id: 'inscription',
      label: <Trans i18nKey="login.list.signin.label">Créer un compte</Trans>,
      href: INSCRIPTION_PATH,
      isActive: mode === SIGNUP_MODE,
      tab: 'inscription',
      prefetch: false,
    },
  ]

  return (
    <div className={className} data-track>
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
