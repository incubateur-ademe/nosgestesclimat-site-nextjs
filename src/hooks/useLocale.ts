import i18nConfig from '@/i18nConfig'
import { useCurrentLocale } from 'next-i18n-router/client'
import { useIframe } from './useIframe'

export function useLocale(): string {
  const { iframeLang } = useIframe()
  const currentLocale = useCurrentLocale(i18nConfig)

  if (iframeLang) {
    return iframeLang
  }

  return currentLocale ?? i18nConfig.defaultLocale
}
