import { SIGNIN_MODE, SIGNUP_MODE } from '@/constants/authentication/modes'
import { CONNEXION_PATH, INSCRIPTION_PATH } from '@/constants/urls/paths'
import Tabs, { type TabItem } from '@/design-system/layout/Tabs'
import type { Locale } from '@/i18nConfig'
import type { AuthenticationMode } from '@/types/authentication'
import Script from 'next/script'
import Trans from '../translation/trans/TransServer'

type Props = {
  locale: Locale
  mode: AuthenticationMode
  className?: string
}

export default function LoginSigninTabs({ locale, mode, className }: Props) {
  const tabs: TabItem[] = [
    {
      id: 'connexion',
      label: (
        <Trans i18nKey="login.list.login.label" locale={locale}>
          Connexion
        </Trans>
      ),
      href: CONNEXION_PATH,
      isActive: mode === SIGNIN_MODE,
      trackingData: {
        event: 'Authentication|Click Tab|Connexion',
        posthog: '{"eventName":"click tab","properties":{"tab":"connexion"}}',
      },
    },
    {
      id: 'inscription',
      label: (
        <Trans i18nKey="login.list.signin.label" locale={locale}>
          Inscription
        </Trans>
      ),
      href: INSCRIPTION_PATH,
      isActive: mode === SIGNUP_MODE,
      trackingData: {
        event: 'Authentication|Click Tab|Inscription',
        posthog: '{"eventName":"click tab","properties":{"tab":"inscription"}}',
      },
    },
  ]

  return (
    <div className={className}>
      <Tabs
        items={tabs}
        ariaLabel="Navigation connexion/inscription"
        containerId="login-signin-tabs-container"
        hideBorder={true}
      />

      <Script
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
      />
    </div>
  )
}
