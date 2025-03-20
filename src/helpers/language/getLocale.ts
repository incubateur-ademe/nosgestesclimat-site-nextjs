import i18nConfig, { type Locale } from '@/i18nConfig'
import { headers } from 'next/headers'

export async function getLocale() {
  try {
    const headersList = await headers()
    const path = headersList.get('x-invoke-path') || ''
    const locale = path.split('/')[1] // Gets the first path segment after the domain

    // Check if the locale is valid (exists in your i18nConfig)
    if (i18nConfig.locales.includes(locale as Locale)) {
      return locale
    }

    return i18nConfig.defaultLocale
  } catch (error) {
    console.error('Failed to get locale from path:', error)
    return i18nConfig.defaultLocale
  }
}
