import i18nConfig from '@/i18nConfig'
import { useCurrentLocale } from 'next-i18n-router/client'

export function useLocale(): string {
  return useCurrentLocale(i18nConfig) ?? i18nConfig.defaultLocale
}
