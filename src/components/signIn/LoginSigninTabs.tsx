import { SIGNIN_MODE, SIGNUP_MODE } from '@/constants/authentication/modes'
import { CONNEXION_PATH, INSCRIPTION_PATH } from '@/constants/urls/paths'
import type { Locale } from '@/i18nConfig'
import type { AuthenticationMode } from '@/types/authentication'
import Link from 'next/link'
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
    <div className={className} id="login-signin-tabs-container">
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

      {/* <Script
        id="login-signin-tabs-tracking-global"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            if (!window.loginSigninTabsTrackingAdded) {
              window.loginSigninTabsTrackingAdded = true;
              
              // Wait for DOM to be ready
              const initTracking = () => {
                const container = document.getElementById('login-signin-tabs-container');
                
                if (!container) {
                  console.warn('🔧 LoginSigninTabs: Container not found, retrying...');
                  setTimeout(initTracking, 100);
                  return;
                }
                
                console.log('🔧 LoginSigninTabs: Event listener registered on container');
                
                container.addEventListener('click', (e) => {
                  const target = e.target.closest('[data-track-event]');
                  const posthogTarget = e.target.closest('[data-track-posthog]');
                  
                  // Only process if the target is within this container
                  if ((target && container.contains(target)) || (posthogTarget && container.contains(posthogTarget))) {
                    console.log('🔧 LoginSigninTabs: Click detected in tabs', {
                      href: e.target?.closest('a')?.href,
                      timestamp: Date.now()
                    });
                    
                    // Execute tracking asynchronously
                    setTimeout(() => {
                      if (target) {
                        const eventData = target.dataset.trackEvent.split('|');
                        console.log('Matomo tracking:', eventData);
                        window._paq?.push(['trackEvent', ...eventData]);
                      }
                      
                      if (posthogTarget) {
                        const { eventName, ...properties } = JSON.parse(posthogTarget.dataset.trackPosthog);
                        console.log('Posthog tracking:', { eventName, properties });
                        window.posthog?.capture(eventName, properties);
                      }
                    }, 0);
                  }
                });
              };
              
              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', initTracking);
              } else {
                initTracking();
              }
            }
          `,
        }}
      /> */}
    </div>
  )
}
