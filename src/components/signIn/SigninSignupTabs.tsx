import { SIGNIN_MODE, SIGNUP_MODE } from '@/constants/authentication/modes'
import { CONNEXION_PATH, INSCRIPTION_PATH } from '@/constants/urls/paths'
import type { AuthenticationMode } from '@/types/authentication'
import Trans from '../translation/trans/TransClient'
import TabLink from './signinSignupTabs/TabLink'

type Props = {
  mode: AuthenticationMode
  className?: string
}

export default function SigninSignupTabs({ mode, className }: Props) {
  return (
    <div className={className}>
      <nav aria-label="Navigation connexion/inscription">
        <ul className="flex items-end">
          <li>
            <TabLink
              href={CONNEXION_PATH}
              isActive={mode === SIGNIN_MODE}
              tab="connexion">
              <Trans i18nKey="login.list.login.label">Connexion</Trans>
            </TabLink>
          </li>

          <li>
            <TabLink
              href={INSCRIPTION_PATH}
              isActive={mode === SIGNUP_MODE}
              tab="inscription">
              <Trans i18nKey="login.list.signin.label">Inscription</Trans>
            </TabLink>
          </li>
        </ul>
      </nav>
    </div>
  )
}
