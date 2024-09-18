import { getGeolocation } from '@/helpers/getGeolocation'
import { getMigrationInstructions } from '@/helpers/modelFetching/getMigrationInstructions'
// Initialise react-i18next
import Footer from '@/components/layout/Footer'
import '@/locales/initClient'
import '@/locales/initServer'
import { dir } from 'i18next'
import { currentLocale } from 'next-i18n-router'
import dynamic from 'next/dynamic'
import localFont from 'next/font/local'
import Script from 'next/script'
import { PropsWithChildren } from 'react'
import MainLayoutProviders from './_components/MainLayoutProviders'
import './globals.css'

const ClientErrorModal = dynamic(
  () => import('@/components/error/ErrorModal'),
  { ssr: false }
)

export const marianne = localFont({
  src: [
    {
      path: '../../public/fonts/Marianne-Thin.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Marianne-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Marianne-Regular.woff2',
      weight: 'normal',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Marianne-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Marianne-Bold.woff2',
      weight: 'bold',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Marianne-ExtraBold.woff2',
      weight: '800',
      style: 'normal',
    },
  ],
  variable: '--font-marianne',
})

export default async function RootLayout({ children }: PropsWithChildren) {
  try {
    const lang = currentLocale()
    const region = await getGeolocation()
    const migrationInstructions = await getMigrationInstructions()

    return (
      <html lang={lang ?? ''} dir={dir(lang ?? '')}>
        <head>
          <link rel="icon" href="/favicon.png" />

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

        <body
          className={`${marianne.className} bg-white text-default transition-colors duration-700`}>
          <Script id="script-user-agent">{`
            const b = document.documentElement;
            b.setAttribute('data-useragent', navigator.userAgent);
          `}</Script>

          <MainLayoutProviders
            region={region}
            migrationInstructions={migrationInstructions}>
            {children}
            <Footer />
          </MainLayoutProviders>

          <div id="modal" />
        </body>
      </html>
    )
  } catch (error) {
    return (
      <html lang="fr">
        <body>
          <ClientErrorModal error={error as Error} />
        </body>
      </html>
    )
  }
}
