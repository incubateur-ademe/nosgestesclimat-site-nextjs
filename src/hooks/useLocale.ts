import { i18nConfig } from '@/constants/i18n'
import { useCurrentLocale } from 'next-i18n-router/client'

export const useLocale = () => {
  return useCurrentLocale(i18nConfig)
}
