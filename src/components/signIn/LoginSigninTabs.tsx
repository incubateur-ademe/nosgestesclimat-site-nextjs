import { SIGNIN_MODE, SIGNUP_MODE } from '@/constants/authentication/modes'
import { CONNEXION_PATH, INSCRIPTION_PATH } from '@/constants/urls/paths'
import type { Locale } from '@/i18nConfig'
import type { AuthenticationMode } from '@/types/authentication'
import Link from 'next/link'
import Script from 'next/script'
import Trans from '../translation/trans/TransServer'

type Props = {
  locale: Locale
  mode: AuthenticationMode
  className?: string
}

const TabLink = ({
  href,
  isActive,
  children,
  ...props
}: {
  href: string
  isActive: boolean
  children: React.ReactNode
} & React.HTMLAttributes<HTMLAnchorElement>) => {
  const baseClasses =
    'inline-block px-4 py-3 text-lg border-b-3 border-transparent'
  const activeClasses =
    'font-bold px-4 py-3 border-primary-600! border-current text-primary-600'
  if (isActive) {
    return (
      <span
        aria-current="page"
        className={`${baseClasses} ${activeClasses}`}
        {...props}>
        {children}
      </span>
    )
  }
  return (
    <Link href={href} className={baseClasses} {...props}>
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
            <TabLink
              href={CONNEXION_PATH}
              isActive={mode === SIGNIN_MODE}
              data-track-event="Authentication|Click Tab|Connexion"
              data-track-posthog='{"eventName":"click tab","properties":{"tab":"connexion"}}'>
              <Trans i18nKey="login.list.login.label" locale={locale}>
                Connexion
              </Trans>
            </TabLink>
          </li>

          <li>
            <TabLink
              href={INSCRIPTION_PATH}
              isActive={mode === SIGNUP_MODE}
              data-track-event="Authentication|Click Tab|Inscription"
              data-track-posthog='{"eventName":"click tab","properties":{"tab":"inscription"}}'>
              <Trans i18nKey="login.list.signin.label" locale={locale}>
                Inscription
              </Trans>
            </TabLink>
          </li>
        </ul>
      </nav>

      <Script
        id="login-signin-tabs-tracking"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('click', (e) => {
              const target = e.target.closest('[data-track-event]');
              if (target) {
                const eventData = target.dataset.trackEvent.split('|');
                console.log('Matomo tracking:', eventData);
                console.debug('Matomo tracking => ' + eventData.join(' => '));
                window._paq?.push(['trackEvent', ...eventData]);
              }
              
              const posthogTarget = e.target.closest('[data-track-posthog]');
              if (posthogTarget) {
                const { eventName, ...properties } = JSON.parse(posthogTarget.dataset.trackPosthog);
                console.log('Posthog tracking:', { eventName, properties });
                console.debug('Posthog tracking => "' + eventName + '" =>', properties);
                window.posthog?.capture(eventName, properties);
              }
            });
          `,
        }}
      />
    </div>
  )
}
