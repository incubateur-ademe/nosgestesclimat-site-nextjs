'use client'

import { useClientTranslation } from '@/locales/client'
import { PropsWithChildren } from 'react'
import { Trans } from 'react-i18next'

export default function TransClient({
  children,
  i18nKey,
}: PropsWithChildren<{ i18nKey?: string }>) {
  const { t } = useClientTranslation()

  return (
    <Trans t={t} i18nKey={i18nKey}>
      {children}
    </Trans>
  )
}
