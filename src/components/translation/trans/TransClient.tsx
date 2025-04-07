'use client'

import { useClientTranslation } from '@/hooks/useClientTranslation'
import type { TransPropsWithInterpolation } from '@/types/translation'
import { type ReactElement } from 'react'
import { Trans } from 'react-i18next'

export default function TransClient({
  children,
  i18nKey,
}: TransPropsWithInterpolation): ReactElement | null {
  const { t } = useClientTranslation()

  return (
    <Trans t={t} i18nKey={i18nKey}>
      {children}
    </Trans>
  )
}
