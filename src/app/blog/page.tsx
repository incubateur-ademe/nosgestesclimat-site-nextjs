'use client'

import PageLayout from '@/components/layout/PageLayout'
import TransClient from '@/components/translation/TransClient'
import Main from '@/design-system/layout/Main'
import Title from '@/design-system/layout/Title'
import PostListItem from './_components/PostListItem'
import { blogData } from './_data/articles'

export default function Blog() {
	return (
		<PageLayout shouldShowMenu>
			{/*
			<Meta
				title={title}
				description={description}
				image="https://nosgestesclimat.fr/images/dessin-nosgestesclimat.png"
			/>
  */}
			<Main className="max-w-[800px]">
				<Title
					title={<TransClient>Le Blog</TransClient>}
					data-cypress-id="blog-title"
				/>
				<div>
					<img
						alt=""
						className="h-[237px] w-full object-cover object-center"
						src="https://nosgestesclimat.fr/images/dessin-nosgestesclimat.png"
					/>
					<p>
						<TransClient>Découvrez nos articles de blog :</TransClient>
					</p>
				</div>

				<ul className="grid list-none grid-cols-1 justify-center gap-4 pl-0 sm:grid-cols-2">
					{blogData.map((post) => (
						<PostListItem post={post} key={post.slug} />
					))}
				</ul>
			</Main>
		</PageLayout>
	)
}
