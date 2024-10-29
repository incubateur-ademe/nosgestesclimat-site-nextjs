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
      className="flex rounded-xl bg-white !no-underline md:flex-col">
      <div className="relative w-1/3 min-w-28 md:mb-4 md:w-auto">
        <Image
          src={imageSrc}
          alt=""
          width={300}
          height={300}
          className="h-full w-full rounded-xl object-cover"
        />
        <div className="absolute left-2 top-2 hidden md:block ">
          <Badge className="inline-block text-xs">{category}</Badge>
        </div>
      </div>

      <div className="flex flex-col">
        <p className="mb-2 px-4 pt-4 text-xs font-bold text-primary-700 md:hidden">
          {category}
        </p>

        <h3 className="mb-2 pl-4 pr-2 text-xs font-normal text-default !no-underline md:px-4 md:text-base">
          {title}
        </h3>

        <div className="cursor-pointer p-4 pt-0 text-left text-xs text-primary-700 underline md:text-right md:text-base">
          <Trans>Lire la suite</Trans>
        </div>
      </div>
    </a>
  )
}
