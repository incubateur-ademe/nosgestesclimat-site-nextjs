'use client'

import Error500 from '@/components/layout/500'
import logger from '@/logger/logger.browser'
import { isServerReportedError } from '@/observability/uncaught-errors'
import { toError } from '@nosgestesclimat/core/lib/to-error'
import NextError from 'next/error'
import { useEffect } from 'react'

interface Props {
  error: unknown
}
export default function GlobalError({ error }: Props) {
  useEffect(() => {
    if (isServerReportedError(error)) return

    logger.error(toError(error), { scope: 'site.view.globalError' })
  }, [error])

  return (
    <html lang="fr">
      <body style={{ backgroundColor: 'white', fontFamily: 'sans-serif' }}>
        <Error500 />

        <NextError statusCode={500} />
      </body>
    </html>
  )
}
