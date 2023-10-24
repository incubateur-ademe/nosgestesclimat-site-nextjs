'use client'

import { useClientTranslation } from '@/hooks/useClientTranslation'
import { TransPropsWithInterpolation } from '@/types/translation'
import { ReactElement } from 'react'
import { Trans } from 'react-i18next'

export default function TransClient({
  children,
  i18nKey,
}: TransPropsWithInterpolation): ReactElement {
  const { t } = useClientTranslation()

  return (
    <Trans t={t} i18nKey={i18nKey}>
      {children}
    </Trans>
  )
}
