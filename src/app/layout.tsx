import FilAriane from '@/components/layout/FilAriane'
import Header from '@/components/layout/Header'
import { getGeolocation } from '@/helpers/getGeolocation'
import { getMigrationInstructions } from '@/helpers/modelFetching/getMigrationInstructions'
// Initialise react-i18next
import '@/locales/initClient'
import '@/locales/initServer'
import { ErrorBoundary } from '@sentry/nextjs'
import { dir } from 'i18next'
import { currentLocale } from 'next-i18n-router'
import localFont from 'next/font/local'
import Script from 'next/script'
import { PropsWithChildren } from 'react'
import { ErrorFallback } from './_components/ErrorFallback'
import MainLayoutProviders from './_components/MainLayoutProviders'
import './globals.css'

export const marianne = localFont({
  src: [
    {
      path: '_fonts/Marianne-Thin.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: '_fonts/Marianne-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '_fonts/Marianne-Regular.woff2',
      weight: 'normal',
      style: 'normal',
    },
    {
      path: '_fonts/Marianne-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '_fonts/Marianne-Bold.woff2',
      weight: 'bold',
      style: 'normal',
    },
    {
      path: '_fonts/Marianne-ExtraBold.woff2',
      weight: '800',
      style: 'normal',
    },
  ],
  variable: '--font-marianne',
})

export default async function RootLayout({ children }: PropsWithChildren) {
  const lang = currentLocale()
  const region = await getGeolocation()
  const migrationInstructions = await getMigrationInstructions()

  return (
    <html lang={lang ?? ''} dir={dir(lang ?? '')}>
      <head>
        <link rel="icon" href="/images/misc/favicon.png" />

        <meta
          name="google-site-verification"
          content="oQ9gPKS4kocrCJP6CoguSkdIKKZ6ilZz0aQw_ZIgtVc"
        />

        <meta property="twitter:card" content="summary_large_image" />

        <link rel="manifest" href="../manifest.webmanifest" />

        <meta name="theme-color" content="#4949ba" />

        {process.env.NEXT_PUBLIC_MATOMO_ID === '1' && (
          <Script id="matomo">
            {`
          var _paq = window._paq = window._paq || [];
          /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
          _paq.push(["setDocumentTitle", document.domain + "/" + document.title]);
          _paq.push(["setCookieDomain", "*.nosgestesclimat.fr"]);
          _paq.push(['enableLinkTracking']);
          (function() {
            // var u="https://stats.beta.gouv.fr/";
            var u="https://stats.data.gouv.fr/";
            _paq.push(['setTrackerUrl', u+'matomo.php']);
            // _paq.push(['setSiteId', '20']);
            _paq.push(['setSiteId', '153']);
            // Adds the Matomo V1 tracker for safe measure
            // _paq.push(['addTracker', 'https://stats.data.gouv.fr/matomo.php', '153'])
            var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
            g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
          })();
        `}
          </Script>
        )}
      </head>

      <body className={`${marianne.className} bg-white text-default`}>
        <Script id="script-user-agent">{`
          const b = document.documentElement;
          b.setAttribute('data-useragent', navigator.userAgent);
        `}</Script>

        <ErrorBoundary showDialog fallback={ErrorFallback}>
          <MainLayoutProviders
            region={region}
            migrationInstructions={migrationInstructions}>
            <Header />

            <FilAriane />

            {children}
          </MainLayoutProviders>
        </ErrorBoundary>

        <div id="modal" />
      </body>
    </html>
  )
}
