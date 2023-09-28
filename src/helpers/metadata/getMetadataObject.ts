import { generateOGImageURL } from '../openGraph/generateOGImageURL'

type Props = {
  title: string
  description: string
  url: string
  params?: Record<string, string>
  searchParams?: Record<string, string>
}

const BASE_URL =
  process.env.MODE === 'development'
    ? 'http://localhost:3000'
    : 'https://nosgestesclimat.fr'

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
          url:
            generateOGImageURL(url) ??
            'https://nosgestesclimat.vercel.app/images/misc/dessin-nosgestesclimat.png',
        },
      ],
    },
  }
}
