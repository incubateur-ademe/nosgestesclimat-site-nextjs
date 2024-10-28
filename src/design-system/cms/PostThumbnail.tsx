import Link from '@/components/Link'
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
      className="flex flex-col gap-4 rounded-xl bg-white !no-underline">
      <div className="relative">
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
      <h3 className="px-4 text-base text-default !no-underline">{title}</h3>

      <div className="p-4 text-right">
        <Link href={href}>
          <Trans>Lire la suite</Trans>
        </Link>
      </div>
    </a>
  )
}
