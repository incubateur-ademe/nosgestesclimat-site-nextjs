import Trackers from '@/components/tracking/Trackers'
import '@/locales/initClient'
import '@/locales/initServer'
import type { DefaultPageProps } from '@/types'
import { dir } from 'i18next'
import localFont from 'next/font/local'
import Script from 'next/script'
import { Suspense } from 'react'
import ServerTracking from './_components/scripts/ServerTracking'
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

        <Suspense>
          <Trackers locale={locale} />
        </Suspense>

        <Script
          src="https://tally.so/widgets/embed.js"
          strategy="lazyOnload"></Script>

        <ServerTracking />
      </head>
      <body
        className={`${marianne.className} text-default bg-white transition-colors duration-700`}>
        {children}
      </body>
    </html>
  )
}
