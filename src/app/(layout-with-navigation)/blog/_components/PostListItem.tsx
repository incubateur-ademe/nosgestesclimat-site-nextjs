'use client'

import Link from '@/components/Link'
import { getFormattedDate } from '@/helpers/date/getFormattedDate'

import Card from '@/design-system/layout/Card'
import { useLocale } from '@/hooks/useLocale'
import { BlogPost } from '@/types/blog'
import Image from 'next/image'

export default function PostListItem({ post }: { post: BlogPost }) {
  const locale = useLocale()

  return (
    <li key={post.slug} className="h-[18rem]">
      <Card
        tag={Link}
        href={`/blog/${post.slug}`}
        className="text-primary-700 h-full w-full !p-10 no-underline">
        <Image
          src={post.image || ''}
          width="100"
          height="100"
          className="mx-auto mb-2 h-36 max-h-[110px] w-48 object-cover"
          alt={`Illustration: ${post.title}`}
        />

        <p className="mb-0 mt-4 font-bold">{post.title}</p>
        <p className="my-0">
          <small>{getFormattedDate(new Date(post.date), locale || 'fr')}</small>
        </p>
      </Card>
    </li>
  )
}
