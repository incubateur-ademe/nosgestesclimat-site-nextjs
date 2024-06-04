import { defaultLocale, locales } from '@/i18nConfig'
import { currentLocale } from 'next-i18n-router'
import { generateOGImageURL } from '../openGraph/generateOGImageURL'

type Props = {
  title: string
  description: string
  params?: Record<string, string>
  searchParams?: Record<string, string>
  noImage?: boolean
  image?: string
  robots?: {
    index: boolean
    follow: boolean
    nocache: boolean
    googleBot: {
      index: boolean
      follow: boolean
      noimageindex: boolean
      'max-video-preview': number
      'max-image-preview': string
      'max-snippet': number
    }
  }
  alternates?: {
    canonical: string
  }
}

const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://nosgestesclimat.fr'

const URLS_SUBSTRING_WITH_DYNAMIC_OG_IMAGE = [
  'diapo=bilan',
  'diapo=categories',
  'diapo=actions',
]

const buildURL = ({
  params,
  searchParams,
  locale,
}: Pick<Props, 'params' | 'searchParams'> & { locale: string }) => {
  const localePart = locale === 'fr' ? '' : `/${locale}`

  const paramsPart =
    params && Object.values(params).length > 0
      ? Object.values(params).map((value) => `/${value}`)
      : ''

  const searchParamsPart =
    searchParams && Object.values(searchParams).length > 0
      ? `?${Object.entries(searchParams).map(
          ([key, value], index) =>
            `${key}=${value}${
              index !== Object.values(searchParams).length - 1 ? '&' : ''
            }`
        )}`
      : ''

  return `${BASE_URL}${localePart}${paramsPart}${searchParamsPart}`
}

export function getMetadataObject({
  title,
  description,
  params,
  searchParams,
  noImage = false,
  image,
  alternates,
  ...props
}: Props) {
  const locale = currentLocale()

  const url = buildURL({
    params,
    searchParams,
    locale: locale ?? defaultLocale,
  })

  let alternatesWithLanguages = null

  if (alternates) {
    let canonical = alternates.canonical

    // We remove the locale from the url (it should not be here anyway, but just in case)
    locales.map((locale) => {
      if (alternates.canonical.startsWith(`/${locale}`)) {
        canonical = alternates.canonical.slice(3)
      }
    })

    // We set the alternates url for each language
    const languages: Record<string, string> = {}
    locales.map((locale) => {
      if (locale === 'fr') return

      languages[locale] =
        `${BASE_URL}${locale === 'fr' ? '' : `/${locale}`}${canonical}`
    })

    // We return the alternates object with the canonical url and the languages alternates
    alternatesWithLanguages = {
      canonical: BASE_URL + canonical,
      languages,
    }
  }

  return {
    title,
    description,
    metadataBase: new URL(url),
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      images: image
        ? image
        : URLS_SUBSTRING_WITH_DYNAMIC_OG_IMAGE.some((urlPart) =>
              url.includes(urlPart)
            ) && !noImage
          ? generateOGImageURL(url)
          : 'https://nosgestesclimat.fr/images/misc/metadata.png',
    },
    alternates: alternatesWithLanguages,
    ...props,
  }
}
