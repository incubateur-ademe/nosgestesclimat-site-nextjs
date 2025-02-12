import type { TransPropsWithInterpolation } from '@/types/translation'
import type { ReactNode } from 'react'
import TransClient from './trans/TransClient'
import TransServer from './trans/TransServer'

export default function Trans({
  locale,
  children,
  i18nKey,
}: TransPropsWithInterpolation & { locale: string }): ReactNode {
  const componentType = typeof window === 'undefined' ? 'server' : 'client'

  if (componentType === 'server') {
    return (
      <TransServer i18nKey={i18nKey} locale={locale}>
        {children}
      </TransServer>
    )
  }
  return <TransClient i18nKey={i18nKey}>{children}</TransClient>
}
