'use client'

import Error500 from '@/components/layout/500'
import * as Sentry from '@sentry/nextjs'
import NextError from 'next/error'
import { useEffect } from 'react'

type Props = {
  error: Error & { digest?: string }
}
export default function GlobalError({ error }: Props) {
  useEffect(() => {
    // Log error to console for Scalingo logs
    console.error('Global error caught:', {
      message: error.message,
      stack: error.stack,
      digest: error.digest,
    })

    // Send to Sentry
    Sentry.captureException(error)
  }, [error])

  return (
    <html lang="fr">
      <body style={{ backgroundColor: 'white', fontFamily: 'sans-serif' }}>
        <Error500 />

        <NextError statusCode={undefined as any} />
      </body>
    </html>
  )
}
