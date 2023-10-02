import { generateOGImageURL } from '../openGraph/generateOGImageURL'

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

const URLS_SUBSTRING_WITH_DYNAMIC_OG_IMAGE = [
  'diapo=bilan',
  'diapo=categories',
  'diapo=actions',
]

const buildURL = ({
  params,
  searchParams,
}: Pick<Props, 'params' | 'searchParams'>) =>
  `${BASE_URL}${
    params && Object.values(params).length > 0
      ? Object.values(params).map((value) => `/${value}`)
      : ''
  }${
    searchParams && Object.values(searchParams).length > 0
      ? `?${Object.entries(searchParams).map(
          ([key, value], index) =>
            `${key}=${value}${
              index !== Object.values(searchParams).length - 1 ? '&' : ''
            }`
        )}`
      : ''
  }`

export function getMetadataObject({
  title,
  description,
  params,
  searchParams,
  noImage = false,
}: Props) {
  const url = buildURL({ params, searchParams })

  console.log(
    'TODO: change images fallback URL before using this in production.'
  )

  return {
    title,
    description,
    metadataBase: new URL('https://acme.com'),
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      images:
        URLS_SUBSTRING_WITH_DYNAMIC_OG_IMAGE.some((urlPart) =>
          url.includes(urlPart)
        ) && !noImage
          ? generateOGImageURL(url)
          : 'https://nosgestesclimat-git-preprod-nos-gestes-climat.vercel.app/images/misc/dessin-nosgestesclimat_thumbnail.png',
    },
  }
}
