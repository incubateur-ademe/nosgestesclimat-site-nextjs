import type { AuthorType } from '@/adapters/cmsClient'
import Image from 'next/image'

export default function AuthorBlock({
  author,
}: {
  author?: AuthorType | null
}) {
  if (!author) return null

  return (
    <div className="mt-8 flex flex-row items-center gap-4">
      <div>
        {author.image ? (
          <Image
            className="overflow-hidden rounded-full"
            src={author.image?.url}
            alt={author.image?.alternativeText}
            width={60}
            height={60}
          />
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
            <p className="mb-0 text-center text-lg">{author.name.charAt(0)}</p>
          </div>
        )}
      </div>

      <div>
        <p className="mb-0 text-lg">{author.name},</p>

        <p className="mb-0 text-sm">{author.description}</p>
      </div>
    </div>
  )
}
