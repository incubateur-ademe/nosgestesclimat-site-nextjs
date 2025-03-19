import { getBanner } from '@/helpers/api/getBanner'
import BannerLink from './banner/BannerLink'

export default async function Banner() {
  const banner = await getBanner()

  if (!banner) return null
  return (
    <div className="inline-flex w-full items-center justify-center bg-primary-700 px-4 py-2 text-sm text-white md:h-12">
      <p className="mb-0 !inline">
        {banner.text}{' '}
        <BannerLink href={banner.link.URL} label={banner.link.label} />
      </p>
    </div>
  )
}
