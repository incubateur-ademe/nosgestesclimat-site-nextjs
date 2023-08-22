'use client'

import { getFormattedDate } from '@/app/nouveautes/_helpers/getFormattedDate'
import { useLang } from '@/contexts/LangContext'
import Card from '@/design-system/layout/Card'
import { BlogPost } from '@/types/blog'

import Link from 'next/link'

export default function PostListItem({ post }: { post: BlogPost }) {
	const locale = useLang()

	return (
		<li key={post.slug} className="h-[15rem]">
			<Card
				tag={Link}
				href={`/blog/${post.slug}`}
				className="flex h-full w-full flex-col"
			>
				{/*
				<Image
					src={extractImage(post.content.toString())}
					className="mb-2 h-36 w-48 object-cover"
					alt={`Illustration: ${post.title}`}
				/>
				*/}

				<div>
					{post.title}
					<div>
						<small>
							{getFormattedDate(new Date(post.date), locale || 'fr')}
						</small>
					</div>
				</div>
			</Card>
		</li>
	)
}
