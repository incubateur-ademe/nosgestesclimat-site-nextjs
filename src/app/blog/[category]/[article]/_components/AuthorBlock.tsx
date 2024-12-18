import type { AuthorType } from '@/types/blog'
import Image from 'next/image'

export default function AuthorBlock({ author }: { author: AuthorType }) {
  return (
    <div className="mt-8 flex flex-row items-center gap-4">
      <div>
        <Image
          className="overflow-hidden rounded-full"
          src={author.image?.url}
          alt={author.image?.alternativeText}
          width={60}
          height={60}
        />
      </div>

      <div>
        <p className="mb-0 text-lg">{author.name},</p>

        <p className="mb-0 text-sm">{author.description}</p>
      </div>
    </div>
  )
}
