import type { Locale } from '@/i18nConfig'
import Link from 'next/link'
import Trans from '../translation/trans/TransServer'

export const LOGIN_MODE = 'login' as const
export const SIGNIN_MODE = 'signin' as const

type Mode = typeof LOGIN_MODE | typeof SIGNIN_MODE

type Props = {
  locale: Locale
  mode: Mode
  className?: string
}

const TabLink = ({
  href,
  isActive,
  children,
}: {
  href: string
  isActive: boolean
  children: React.ReactNode
}) => {
  const baseClasses =
    'inline-block px-4 py-3 text-lg border-b-3 border-transparent'
  const activeClasses =
    'font-bold px-4 py-3 border-primary-600! border-current text-primary-600'
  if (isActive) {
    return (
      <span aria-current="page" className={`${baseClasses} ${activeClasses}`}>
        {children}
      </span>
    )
  }
  return (
    <Link href={href} className={baseClasses}>
      {children}
    </Link>
  )
}

export default function LoginSigninTabs({ locale, mode, className }: Props) {
  return (
    <div className={className}>
      <nav aria-label="Navigation connexion/inscription">
        <ul className="flex items-end">
          <li>
            <TabLink href="/connexion" isActive={mode === LOGIN_MODE}>
              <Trans i18nKey="login.list.login.label" locale={locale}>
                Connexion
              </Trans>
            </TabLink>
          </li>

          <li>
            <TabLink href="/inscription" isActive={mode === SIGNIN_MODE}>
              <Trans i18nKey="login.list.signin.label" locale={locale}>
                Inscription
              </Trans>
            </TabLink>
          </li>
        </ul>
      </nav>
    </div>
  )
}
