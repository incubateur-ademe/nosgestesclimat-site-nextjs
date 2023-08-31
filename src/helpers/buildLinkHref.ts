export const buildLinkHref = (locale: string, href: string): string => {
  if (locale === 'fr') {
    return href
  }

  return `/${locale}${href}`
}
