'use client'

import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useLocale } from '@/hooks/useLocale'
import type { TransPropsWithInterpolation } from '@/types/translation'
import { type ReactElement } from 'react'
import { Trans } from 'react-i18next'
import TransServer from './TransServer'

export default function TransClient({
  children,
  i18nKey,
}: TransPropsWithInterpolation): ReactElement | null {
  const locale = useLocale()
  const { t } = useClientTranslation()

  if (typeof window === 'undefined') {
    return (
      <TransServer locale={locale} i18nKey={i18nKey}>
        {children}
      </TransServer>
    )
  }

  return (
    <Trans t={t} i18nKey={i18nKey}>
      {children}
    </Trans>
  )
}
