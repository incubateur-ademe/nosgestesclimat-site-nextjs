'use client'

import Trans from '@/components/translation/Trans'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { TransPropsWithInterpolation } from '@/types/translation'
import { ReactElement } from 'react'

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
