import './globals.css'

import { PropsWithChildren } from 'react'

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang={'fr'}>
      <head></head>

      <body>{children}</body>
    </html>
  )
}
