import {
  CONNEXION_PATH,
  MON_ESPACE_PATH,
  SIMULATOR_PATH,
} from '@/constants/urls/paths'
import ButtonLinkServer from '@/design-system/buttons/ButtonLinkServer'
import { getIsUserAuthenticated } from '@/helpers/authentication/getIsUserAuthenticated'
import type { Locale } from '@/i18nConfig'
import Script from 'next/script'
import { twMerge } from 'tailwind-merge'
import LogoLinkServer from '../misc/LogoLinkServer'
import Trans from '../translation/trans/TransServer'

type Props = {
  isSticky?: boolean
  locale: Locale
  isOldVersion?: boolean
}

const MAX_EMAIL_LENGTH = 20

export default async function HeaderServer({
  isSticky = true,
  locale,
  isOldVersion = false,
}: Props) {
  const authenticatedUser = await getIsUserAuthenticated()

  return (
    <header
      className={twMerge(
        'h-20 items-center bg-white shadow-xs',
        isSticky ? 'sticky top-0 z-300' : ''
      )}>
      <div className="absolute top-0 right-0 bottom-0 left-0 h-20 w-full items-center border-b border-gray-200 bg-white shadow-xs md:flex">
        <div className="mx-auto flex h-full w-full max-w-5xl items-center justify-between gap-6 px-4 md:px-0">
          <div className="flex origin-left items-center justify-center">
            <LogoLinkServer />
          </div>

          {!isOldVersion && (
            <div className="flex h-full items-center">
              {authenticatedUser ? (
                <ButtonLinkServer
                  size="sm"
                  color="secondary"
                  href={MON_ESPACE_PATH}
                  className="inline-block"
                  data-track-event="Header|Click Mon Espace|Authenticated"
                  data-track-posthog={
                    '{"eventName":"click header mon espace","properties":{"status":"authenticated"}}'
                  }>
                  <Trans i18nKey="header.monEspace" locale={locale}>
                    Mon Espace
                  </Trans>{' '}
                  <span>
                    (
                    {authenticatedUser.email.length > MAX_EMAIL_LENGTH
                      ? `${authenticatedUser.email.substring(0, MAX_EMAIL_LENGTH)}...`
                      : authenticatedUser.email}
                    )
                  </span>
                </ButtonLinkServer>
              ) : (
                <ButtonLinkServer
                  color="secondary"
                  href={CONNEXION_PATH}
                  data-track-event="Header|Click Mon Espace|Unauthenticated"
                  data-track-posthog='{"eventName":"click header mon espace","properties":{"status":"unauthenticated"}}'>
                  <Trans i18nKey="header.monEspace" locale={locale}>
                    Mon Espace
                  </Trans>
                </ButtonLinkServer>
              )}
            </div>
          )}
          {isOldVersion && (
            <div className="flex h-full items-center">
              <ButtonLinkServer color="secondary" href={SIMULATOR_PATH}>
                <Trans i18nKey="header.simulateur" locale={locale}>
                  Accéder au test
                </Trans>
              </ButtonLinkServer>
            </div>
          )}
        </div>
      </div>

      <Script
        id="header-tracking-global"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            // Prevent duplicate event listener registration
            if (!window.headerTrackingAdded) {
              window.headerTrackingAdded = true;
              console.log('🔧 HeaderServer: Event listener registered');
              
              document.addEventListener('click', (e) => {
                console.log('🔧 HeaderServer: Click detected', {
                  target: e.target,
                  currentTarget: e.currentTarget,
                  href: e.target?.closest('a')?.href,
                  isLink: e.target?.closest('a') !== null,
                  timestamp: Date.now()
                });
                
                const target = e.target.closest('[data-track-event]');
                const posthogTarget = e.target.closest('[data-track-posthog]');
                
                if (target || posthogTarget) {
                  console.log('🔧 HeaderServer: Tracking targets found', {
                    hasMatomoTarget: !!target,
                    hasPosthogTarget: !!posthogTarget,
                    matomoData: target?.dataset.trackEvent,
                    posthogData: posthogTarget?.dataset.trackPosthog
                  });
                  
                  // Execute tracking asynchronously to not block navigation
                  setTimeout(() => {
                    console.log('🔧 HeaderServer: Executing tracking (async)');
                    
                    if (target) {
                      const eventData = target.dataset.trackEvent.split('|');
                      console.log('Matomo tracking:', eventData);
                      console.debug('Matomo tracking => ' + eventData.join(' => '));
                      window._paq?.push(['trackEvent', ...eventData]);
                    }
                    
                    if (posthogTarget) {
                      const { eventName, ...properties } = JSON.parse(posthogTarget.dataset.trackPosthog);
                      console.log('Posthog tracking:', { eventName, properties });
                      console.debug('Posthog tracking => "' + eventName + '" =>', properties);
                      window.posthog?.capture(eventName, properties);
                    }
                  }, 0);
                } else {
                  console.log('🔧 HeaderServer: No tracking targets found');
                }
              });
            } else {
              console.log('🔧 HeaderServer: Event listener already registered, skipping');
            }
          `,
        }}
      />
    </header>
  )
}
