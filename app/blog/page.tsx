'use client'

import Title from '@/design-system/layout/Title'
import { useClientTranslation } from '@/locales/client'
import PostListItem from './_components/PostListItem'
import { blogData } from './_data/articles'

export default function Blog() {
	const { t } = useClientTranslation()

	const title = t('Le blog')
	const description = t('pages.Blog.premierParagraphe')

	return (
		<div>
			{/*
			<Meta
				title={title}
				description={description}
				image="https://nosgestesclimat.fr/images/dessin-nosgestesclimat.png"
			/>
  */}

			<Title title={title} data-cypress-id="blog-title" />
			<div
				css={`
					text-align: center;
				`}
			>
				<img
					alt={description}
					className="h-[237px] w-full object-cover object-center"
					src="https://nosgestesclimat.fr/images/dessin-nosgestesclimat.png"
				/>
				<p>{description}</p>
			</div>

			<ul className="flex list-none flex-wrap justify-center pl-0">
				{blogData.map((post) => (
					<PostListItem post={post} />
				))}
			</ul>
		</div>
	)
}
