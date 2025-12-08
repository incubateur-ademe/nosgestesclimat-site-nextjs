import i18nConfig from '@/i18nConfig'
import { headers } from 'next/headers'

export async function getLocale() {
  try {
    const headersList = await headers()

    const locale = headersList.get('x-next-i18n-router-locale') || ''

    return locale
  } catch (error) {
    return i18nConfig.defaultLocale
  }
}
