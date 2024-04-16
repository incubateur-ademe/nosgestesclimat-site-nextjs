import { TransPropsWithInterpolation } from '@/types/translation'
import TransClient from './trans/TransClient'
import TransServer from './trans/TransServer'

export default function Trans({
  children,
  i18nKey,
}: TransPropsWithInterpolation): JSX.Element {
  const componentType = typeof window === 'undefined' ? 'server' : 'client'

  if (componentType === 'server') {
    return <TransServer i18nKey={i18nKey}>{children}</TransServer>
  }
  return <TransClient i18nKey={i18nKey}>{children}</TransClient>
}
