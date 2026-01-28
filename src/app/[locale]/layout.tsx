import TrackersWrapper from '@/components/tracking/TrackersWrapper'
import '@/locales/initClient'
import '@/locales/initServer'
import type { DefaultPageProps } from '@/types'
import { dir } from 'i18next'
import localFont from 'next/font/local'
import Script from 'next/script'
import './globals.css'

export const marianne = localFont({
  src: [
    {
      path: '../../../public/fonts/Marianne-Thin.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/Marianne-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/Marianne-Regular.woff2',
      weight: 'normal',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/Marianne-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/Marianne-Bold.woff2',
      weight: 'bold',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/Marianne-ExtraBold.woff2',
      weight: '800',
      style: 'normal',
    },
  ],
  variable: '--font-marianne',
  display: 'swap',
  preload: true,
})

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
} & DefaultPageProps) {
  const { locale } = await params

  return (
    <html lang={locale} dir={dir(locale)}>
      <head>
        <link rel="icon" href="/favicon.png" />

        <meta
          name="google-site-verification"
          content="oQ9gPKS4kocrCJP6CoguSkdIKKZ6ilZz0aQw_ZIgtVc"
        />

        <meta property="twitter:card" content="summary_large_image" />

        <link rel="manifest" href="/manifest.webmanifest" />

        <meta name="theme-color" content="#4949ba" />

        <TrackersWrapper locale={locale} />

        {
          // Matomo Prod
          process.env.NEXT_PUBLIC_MATOMO_ID === '1' && (
            <Script id="matomo">
              {`
                  var _paq = window._paq = window._paq || [];
                  /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
                  _paq.push(["setDocumentTitle", document.domain + "/" + document.title]);
                  _paq.push(["setCookieDomain", "*.nosgestesclimat.fr"]);
                  _paq.push(['setCookieSameSite', 'None']);
                  _paq.push(['enableLinkTracking']);
                  (function() {
                    var u="https://stats.beta.gouv.fr/";
                    _paq.push(['setTrackerUrl', u+'matomo.php']);
                    _paq.push(['setSiteId', '20']);
                    _paq.push(['addTracker', 'https://stats.data.gouv.fr/matomo.php', '153'])
                    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
                    g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
                  })();
                `}
            </Script>
          )
        }

        {
          // Matomo Pre-prod
          process.env.NEXT_PUBLIC_MATOMO_ID === '2' && (
            <Script id="matomo">
              {`
                var _paq = window._paq = window._paq || [];
                /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
                _paq.push(["setDocumentTitle", document.domain + "/" + document.title]);
                _paq.push(["setCookieDomain", "${process.env.NEXT_PUBLIC_MATOMO_DOMAIN}"]);
                _paq.push(['setCookieSameSite', 'None']);
                _paq.push(['enableLinkTracking']);
                (function() {
                  var u="https://stats.beta.gouv.fr/";
                  _paq.push(['setTrackerUrl', u+'matomo.php']);
                  _paq.push(['setSiteId', '79']);
                  var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
                  g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
                })();
              `}
            </Script>
          )
        }
        <Script
          src="https://tally.so/widgets/embed.js"
          strategy="lazyOnload"></Script>

        <Script
          id="global-tracking"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            if (!window.globalTrackingAdded) {
              window.globalTrackingAdded = true;
              
              // Wait for DOM to be ready
              const initTracking = () => {                
                document.addEventListener('click', (e) => {
                  const target = e.target.closest('[data-track-event]');
                  const posthogTarget = e.target.closest('[data-track-posthog]');
                  
                  // Execute tracking asynchronously if attributes are present
                  if (target || posthogTarget) {                    
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

        {/** Clear unused cookies */}
        <Script
          id="clear-unused-cookies"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            if (!window.clearUnusedCookiesAdded) {
              window.clearUnusedCookiesAdded = true;

              const cookiesStartingWithToRemove = [
                "crisp-client",
              ]
              const cookiesWithDomainToRemove = [
                "youtube.com",
              ]
              
              // Wait for DOM to be ready
              const clearUnusedCookies = () => {
                document.cookie.split(";").forEach((cookie) => {
                  const cookieName = cookie.split("=")[0].trim();
                  const cookieValue = cookie.split("=")[1].trim();

                  // Clear unused cookies starting with a prefix in the list or with a domain in the list
                  if (cookiesStartingWithToRemove.some((prefix) => cookieName.startsWith(prefix)) || cookiesWithDomainToRemove.some((domain) => cookieName.endsWith(domain))) {
                    document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" + window.location.hostname;
                    document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=." + window.location.hostname;
                  }
                });
              };
              
              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', clearUnusedCookies);
              } else {
                clearUnusedCookies();
              }
            }
          `,
          }}
        />
      </head>
      <body
        className={`${marianne.className} text-default bg-white transition-colors duration-700`}>
        {children}
      </body>
    </html>
  )
}
