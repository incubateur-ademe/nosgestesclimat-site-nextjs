import i18nConfig from '@/i18nConfig'
import { updateLangCookie } from './updateLangCookie'

export function updateLang({
  newLocale,
  currentLocale,
  currentPathname,
  searchParams,
}: {
  newLocale: string
  currentLocale: string
  currentPathname: string
  searchParams: string
}) {
  // set cookie for next-i18n-router
  updateLangCookie(newLocale)

  if (currentLocale === i18nConfig.defaultLocale) {
    window.location.href =
      '/' +
      newLocale +
      currentPathname +
      (searchParams.length > 0 ? `?${searchParams}` : '')
  } else {
    window.location.href =
      currentPathname.replace(`/${currentLocale}`, `/${newLocale}`) +
      (searchParams.length > 0 ? `?${searchParams}` : '')
  }
}
