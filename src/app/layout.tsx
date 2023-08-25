// Initialise react-i18next
import '@/locales/initClient'
import '@/locales/initServer'
import { dir } from 'i18next'
import Script from 'next/script'

import './globals.css'

import Footer from '@/components/layout/Footer'

import { UserProvider } from '@/publicodes-state'
import { currentLocale } from 'next-i18n-router'
import localFont from 'next/font/local'
import { ReactNode } from 'react'

const marianne = localFont({
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

export default function RootLayout({ children }: { children: ReactNode }) {
  const lang = currentLocale()

  return (
    <html lang={lang ?? ''} dir={dir(lang ?? '')}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1" />

        <link rel="icon" href="./favicon.png" />

        <link
          rel="alternate"
          hrefLang="en"
          href="https://nosgestesclimat.fr/?lang=en"
          data-react-helmet="true"
        />
        <link
          rel="alternate"
          hrefLang="fr"
          href="https://nosgestesclimat.fr/?lang=fr"
          data-react-helmet="true"
        />
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://nosgestesclimat.fr"
          data-react-helmet="true"
        />

        <meta property="og:type" content="website" data-react-helmet="true" />

        <meta
          property="og:title"
          data-react-helmet="true"
          content="<%= htmlWebpackPlugin.options.title %>"
        />

        <meta
          property="og:description"
          data-react-helmet="true"
          content="<%= htmlWebpackPlugin.options.description %>"
        />

        <meta
          property="og:image"
          content="<%= htmlWebpackPlugin.options.logo %>"
          data-react-helmet="true"
        />
        <meta
          name="google-site-verification"
          content="oQ9gPKS4kocrCJP6CoguSkdIKKZ6ilZz0aQw_ZIgtVc"
        />

        <meta
          property="twitter:card"
          content="summary_large_image"
          data-react-helmet="true"
        />

        <link rel="manifest" href="../manifest.webmanifest" />

        <meta name="theme-color" content="#5758BB" />

        {/*
          Manually setting Netlify code spliting cookie in iframe with sameSite=None and secure. 
          See : https://answers.netlify.com/t/running-split-tests-in-an-iframe-adjust-nf-ab-cookie-settings/28754
        */}
        <Script id="script-netlify">
          {`
						if (window.location.href.includes('iframe')) {
							const cookieIsSet = document.cookie.includes('nf_ab');
							if (!cookieIsSet) {
								document.cookie = "nf_ab=${Math.random()}; sameSite=None; secure=true";
								window.location.reload(); // We need to reload the page for the client to match the server
							}
						}
          `}
        </Script>
      </head>

      <body className={marianne.className}>
        <Script id="script-user-agent">{`
          const b = document.documentElement;
          b.setAttribute('data-useragent', navigator.userAgent);
        `}</Script>

        {/*
          Polyfill and source for old browser
          Add polyfill.io for a very narrow web feature
          IntersectionObserver : SAFARI 11 & 12.0  https://caniuse.com/#search=intersectionobserver
        */}
        <Script src="https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver" />

        <UserProvider>{children}</UserProvider>

        <Footer />
      </body>
    </html>
  )
}
