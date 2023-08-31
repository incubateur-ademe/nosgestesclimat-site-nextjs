// Initialise react-i18next

import Script from 'next/script'

import './globals.css'

import { UserProvider } from '@/publicodes-state'
import localFont from 'next/font/local'
import { PropsWithChildren } from 'react'
import QueryClientProviderWrapper from './_components/QueryClientProviderWrapper'

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

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang={'fr'}>
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
        <QueryClientProviderWrapper>
          <UserProvider initialRegion={region}>{children}</UserProvider>
        </QueryClientProviderWrapper>
      </body>
    </html>
  )
}
