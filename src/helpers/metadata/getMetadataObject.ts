import { generateOGImageURL } from '../openGraph/generateOGImageURL'

type Props = {
  title: string
  description: string
  params?: Record<string, string>
  searchParams?: Record<string, string>
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
}: Props) {
  const url = buildURL({ params, searchParams })

  console.log(
    'TODO: change images fallback URL before using this in production.'
  )

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      images: [
        {
          url: URLS_SUBSTRING_WITH_DYNAMIC_OG_IMAGE.some((urlPart) =>
            url.includes(urlPart)
          )
            ? generateOGImageURL(url)
            : 'https://nosgestesclimat.vercel.app/images/misc/dessin-nosgestesclimat.png',
        },
      ],
    },
  }
}
