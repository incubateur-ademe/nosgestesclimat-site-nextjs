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
    <a href={href} className="flex flex-col rounded-xl bg-white !no-underline">
      <div className="relative mb-4">
        <Image
          src={imageSrc}
          alt=""
          width={300}
          height={300}
          className="w-full rounded-xl"
        />
        <div className="absolute left-2 top-2 ">
          <Badge className="inline-block text-xs">{category}</Badge>
        </div>
      </div>
      <h3 className="mb-2 px-4 text-base text-default !no-underline">
        {title}
      </h3>

      <div className="cursor-pointer p-4 pt-0 text-right text-primary-700 underline">
        <Trans>Lire la suite</Trans>
      </div>
    </a>
  )
}
