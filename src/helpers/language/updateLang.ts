import i18nConfig from '@/i18nConfig'
import { updateLangCookie } from './updateLangCookie'

export function updateLang({
  newLocale,
  currentLocale,
}: {
  newLocale: string
  currentLocale: string
}) {
  if (!i18nConfig.locales.includes(newLocale)) {
    console.error('Unauthorized locale:', newLocale)
    return
  }

  // set cookie for next-i18n-router
  updateLangCookie(newLocale)

  const url = new URL(window.location.href)

  if (currentLocale === i18nConfig.defaultLocale) {
    url.pathname = `/${newLocale}/${url.pathname}`
  } else {
    url.pathname = url.pathname.replace(`/${currentLocale}`, `/${newLocale}`)
  }

  window.location.href = url.toString()
}
