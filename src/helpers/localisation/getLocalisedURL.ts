import { languages } from '@/constants/translation'

export function getLocalisedURL({
  locale,
  href,
  shouldLog = false,
}: {
  locale: string
  href: string
  shouldLog?: boolean
}) {
  if (shouldLog) console.log({ href })
  // French is the default language, so it isn't included in the URL
  const activeLanguageOtherThanFrench = languages.find((language) =>
    href.includes(language)
  )
  if (shouldLog) console.log({ activeLanguageOtherThanFrench })
  if (activeLanguageOtherThanFrench) {
    const hrefModified = href.replace(`/${activeLanguageOtherThanFrench}`, '')
    console.log({ hrefModified })
    return hrefModified.startsWith('/') ? hrefModified : `/${hrefModified}`
  }

  if (shouldLog)
    console.log(
      `${locale !== languages[0] ? `/${locale}` : ''}${href}${href ? '/' : ''}`
    )

  return `${locale !== languages[0] ? `/${locale}` : ''}${href}${
    href ? '/' : ''
  }`
}
