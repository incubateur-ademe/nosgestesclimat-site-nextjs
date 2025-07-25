import CookieConsentBannerAndManagement from '@/components/cookies/CookieConsentBannerAndManagement'
import ErrorContent from '@/components/error/ErrorContent'
import { GoogleTagIframe } from '@/components/googleTagManager/GoogleTagIframe'
import { GoogleTagScript } from '@/components/googleTagManager/GoogleTagScript'
import SkipToMainContentLink from '@/design-system/accessibility/SkipToMainContentLink'
import Banner from '@/design-system/cms/Banner'
import type { Locale } from '@/i18nConfig'
import '@/locales/initClient'
import '@/locales/initServer'
import type { DefaultPageProps } from '@/types'
import { captureException } from '@sentry/nextjs'
import { dir } from 'i18next'
import localFont from 'next/font/local'
import Script from 'next/script'
import MainLayoutProviders from './_components/MainLayoutProviders'
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

  try {
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
        </head>

        <MainLayoutProviders>
          <SkipToMainContentLink />

          <CookieConsentBannerAndManagement />

          <Banner locale={locale as Locale} />

          {children}

          <GoogleTagScript />
          <GoogleTagIframe />
        </MainLayoutProviders>
      </html>
    )
  } catch (error) {
    captureException(error)
    return (
      <html lang="fr">
        <body className={`${marianne.className} text-default bg-white`}>
          <div className="flex h-screen flex-col items-center justify-center">
            <ErrorContent />
          </div>
        </body>
      </html>
    )
  }
}
