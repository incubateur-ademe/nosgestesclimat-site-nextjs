import i18nConfig, { type Locale } from '@/i18nConfig'
import { locale } from 'next/root-params'

/**
 * Reads the current root param `locale` and narrows it to a `Locale`.
 *
 * Two root layouts exist (`app/[locale]/layout.tsx` and `app/app-crash/layout.tsx`),
 * so `locale()` is typed `string | undefined`. Falls back to the default locale.
 */
export async function getLocale(): Promise<Locale> {
  return ((await locale()) ?? i18nConfig.defaultLocale) as Locale
}
