import ErrorContent from '@/components/error/ErrorContent'
import Footer from '@/components/layout/Footer'
import '@/locales/initClient'
import '@/locales/initServer'
import { dir } from 'i18next'
import Script from 'next/script'
import MainLayoutProviders from './_components/MainLayoutProviders'
import './globals.css'

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  try {
    // const initialRegion = await getGeolocation()
    const initialRegion = {
      name: 'France',
      code: 'FR',
    }

    return (
      <html lang={locale} dir={dir(locale)}>
        <head>
          <link rel="icon" href="/favicon.png" />

          <meta
            name="google-site-verification"
            content="oQ9gPKS4kocrCJP6CoguSkdIKKZ6ilZz0aQw_ZIgtVc"
          />

          <meta property="twitter:card" content="summary_large_image" />

          <link rel="manifest" href="../manifest.webmanifest" />

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
                _paq.push(["setCookieDomain", "*.nosgestesclimat.fr"]);
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
        </head>

        <body className="text-default bg-white transition-colors duration-700">
          <Script id="script-user-agent">{`
            const b = document.documentElement;
            b.setAttribute('data-useragent', navigator.userAgent);
          `}</Script>

          <MainLayoutProviders initialRegion={initialRegion}>
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
        <body className="text-default bg-white">
          <div className="flex h-screen flex-col items-center justify-center">
            <ErrorContent />
          </div>
        </body>
      </html>
    )
  }
}
