import i18nConfig from '@/i18nConfig'
import { useCurrentLocale } from 'next-i18n-router/client'

export const useLocale = () => {
  return useCurrentLocale(i18nConfig)
}
