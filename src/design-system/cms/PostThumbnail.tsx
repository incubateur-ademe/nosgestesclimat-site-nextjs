import Trans from '@/components/translation/Trans'
import Image from 'next/image'
import Badge from '../layout/Badge'

export default function PostThumbnail({
  title,
  category,
  imageSrc,
  href,
}: {
  title: string
  category: string
  imageSrc: string
  href: string
}) {
  return (
    <a
      href={href}
      className="flex rounded-xl bg-white !no-underline !duration-500 md:flex-col md:transition-transform md:hover:translate-y-[-6px]">
      <div className="relative min-h-[134px] w-1/3 min-w-28 md:mb-4 md:min-h-[240px] md:w-auto">
        <Image
          src={imageSrc}
          alt=""
          width={320}
          height={240}
          className="h-full w-full rounded-xl object-cover"
        />
        {/* Hidden on mobile */}
        <div className="absolute left-2 top-2 hidden md:block ">
          <Badge className="inline-block text-xs">{category}</Badge>
        </div>
      </div>

      <div className="flex flex-col">
        {/* Hidden on desktop */}
        <p className="mb-2 px-4 pt-4 text-xs font-bold text-primary-700 md:hidden md:text-[13px]">
          {category}
        </p>

        <h3 className="mb-2 pl-4 pr-2 text-[13px] font-normal text-default !no-underline md:px-4 md:text-base">
          {title}
        </h3>

        <div className="cursor-pointer p-4 pt-0 text-left text-[13px] text-primary-700 underline md:text-right md:text-base">
          <Trans>Lire la suite</Trans>
        </div>
      </div>
    </a>
  )
}
