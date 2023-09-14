import { languages } from '@/constants/translation'

export function getLocalisedURL({
  locale,
  href,
}: {
  locale: string
  href: string
}) {
  // French is the default language, so it isn't included in the URL
  const activeLanguageOtherThanFrench = languages.find((language) =>
    href.includes(language)
  )

  if (activeLanguageOtherThanFrench) {
    const hrefModified = href.replace(`/${activeLanguageOtherThanFrench}`, '')

    return hrefModified.startsWith('/') ? hrefModified : `/${hrefModified}`
  }

  return `${locale !== languages[0] ? `/${locale}` : ''}${href}/`
}
