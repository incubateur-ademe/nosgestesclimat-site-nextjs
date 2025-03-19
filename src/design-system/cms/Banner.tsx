import { getBanner } from '@/helpers/api/getBanner'
import ButtonLink from '../inputs/ButtonLink'

export default async function Banner() {
  const banner = await getBanner()

  if (!banner) return null

  return (
    <div className="inline-flex w-full items-center justify-center bg-primary-700 px-4 py-2 text-sm text-white md:h-12">
      <p className="mb-0 !inline">
        {banner.text}{' '}
        <ButtonLink
          size="sm"
          className="!inline-flex border-primary-100 bg-white px-2 py-1 text-primary-800 transition-colors duration-300 hover:border-primary-200 hover:bg-primary-100 hover:text-primary-800"
          href={banner.link.url}>
          {banner.link.label}
        </ButtonLink>
      </p>
    </div>
  )
}
