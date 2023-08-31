// Initialise react-i18next

import { currentLocale } from 'next-i18n-router'
import { PropsWithChildren } from 'react'

export default async function RootLayout({ children }: PropsWithChildren) {
  const lang = currentLocale()

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

      <body>{children}</body>
    </html>
  )
}
