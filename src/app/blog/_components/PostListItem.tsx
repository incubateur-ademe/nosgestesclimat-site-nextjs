'use client'

import { getFormattedDate } from '@/app/nouveautes/_helpers/getFormattedDate'
import { useLang } from '@/contexts/LangContext'
import Card from '@/design-system/layout/Card'
import Link from 'next/link'

export default function PostListItem({ post }) {
	const locale = useLang()

	return (
		<li key={post.slug} className="m-4 h-[15rem] w-[18rem]">
			<Card
				tag={Link}
				href={`/blog/${post.slug}`}
				className="flex h-full w-full flex-col"
			>
				{/*
        	<Image
            src={extractImage(post.content)}
            className="mb-2 h-36 w-48 object-cover"
            alt={`Illustration: ${post.title}`}
          />
        */}

				<div>
					{post.title}
					<div>
						<small>{getFormattedDate(new Date(post.date), locale || '')}</small>
					</div>
				</div>
			</Card>
		</li>
	)
}
