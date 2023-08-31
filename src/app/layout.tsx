// Initialise react-i18next

import localFont from 'next/font/local'
import { PropsWithChildren } from 'react'

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
      <head></head>

      <body className={marianne.className}>{children}</body>
    </html>
  )
}
