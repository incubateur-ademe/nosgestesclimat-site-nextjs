'use client'

import { getFormattedDate } from '@/app/nouveautes/_helpers/getFormattedDate'
import { useLang } from '@/contexts/LangContext'
import Card from '@/design-system/layout/Card'
import { BlogPost } from '@/types/blog'
import Image from 'next/image'

import Link from 'next/link'

export default function PostListItem({ post }: { post: BlogPost }) {
	const locale = useLang()

	return (
		<li key={post.slug} className="h-[18rem]">
			<Card
				tag={Link}
				href={`/blog/${post.slug}`}
				className="flex h-full w-full flex-col !p-10 text-primaryDark no-underline"
			>
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
