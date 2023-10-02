import { currentLocale } from 'next-i18n-router'

type Props = {
  title: string
  description: string
  params?: Record<string, string>
  searchParams?: Record<string, string>
  noImage?: boolean
}

const BASE_URL =
  process.env.MODE === 'development'
    ? 'http://localhost:3000'
    : 'https://nosgestesclimat.fr'

// const URLS_SUBSTRING_WITH_DYNAMIC_OG_IMAGE = [
//   'diapo=bilan',
//   'diapo=categories',
//   'diapo=actions',
// ]

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
  searchParams, // noImage = false,
}: Props) {
  const locale = currentLocale()
  const url = buildURL({ params, searchParams, locale: locale || 'fr' })

  console.log(
    'TODO: change images fallback URL before using this in production.'
  )

  return {
    title,
    description,
    metadataBase: new URL(url),
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      // images:
      //   URLS_SUBSTRING_WITH_DYNAMIC_OG_IMAGE.some((urlPart) =>
      //     url.includes(urlPart)
      //   ) && !noImage
      //     ? generateOGImageURL(url)
      //     : 'https://nosgestesclimat-git-preprod-nos-gestes-climat.vercel.app/images/misc/dessin-nosgestesclimat_thumbnail.png',
    },
  }
}
