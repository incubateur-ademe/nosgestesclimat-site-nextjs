'use client'

import Trans from '@/components/translation/Trans'
import InlineLink from '@/design-system/inputs/InlineLink'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import * as Sentry from '@sentry/nextjs'
import NextError from 'next/error'
import { useEffect } from 'react'

type Props = {
  error: Error & { digest?: string }
}
export default function GlobalError({ error }: Props) {
  const { t } = useClientTranslation()

  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <html lang="fr">
      <body>
        <div className="mx-auto my-16 text-center text-primary-700">
          <h1 className="flex items-center justify-center">
            {t('Oups\u202f! Une erreur est survenue')}{' '}
            <span role="img" aria-label="Emoji no" aria-hidden>
              😮
            </span>
          </h1>

          <InlineLink
            href="/"
            className="flex flex-col items-center !text-center">
            <em>
              <Trans i18nKey="404.action">Revenir en lieu sûr</Trans>
            </em>
          </InlineLink>
        </div>
        <NextError statusCode={undefined as any} />
      </body>
    </html>
  )
}
