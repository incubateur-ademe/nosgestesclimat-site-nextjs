import { languages } from '@/constants/translation'

export function getLocalisedURL({
  locale,
  href,
}: {
  locale: string
  href: string
}) {
  console.log({ href })
  // French is the default language, so it isn't included in the URL
  const activeLanguageOtherThanFrench = languages.find((language) =>
    href.includes(language)
  )
  console.log({ activeLanguageOtherThanFrench })
  if (activeLanguageOtherThanFrench) {
    const hrefModified = href.replace(`/${activeLanguageOtherThanFrench}`, '')
    console.log({ hrefModified })
    return hrefModified.startsWith('/') ? hrefModified : `/${hrefModified}`
  }

  console.log(
    `${locale !== languages[0] ? `/${locale}` : ''}${href}${href ? '/' : ''}`
  )

  return `${locale !== languages[0] ? `/${locale}` : ''}${href}${
    href ? '/' : ''
  }`
}
