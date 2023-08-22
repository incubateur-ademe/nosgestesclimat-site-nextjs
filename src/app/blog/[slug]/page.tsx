'use client'

import PageLayout from '@/components/layout/PageLayout'
import TransClient from '@/components/translation/TransClient'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { JSXElementConstructor } from 'react'
import { blogData } from '../_data/articles'

export default function BlogPost() {
	const { slug } = useParams()
	const markdownFile = blogData.find(
		(element) => element.slug == decodeURI(slug as string)
	)
	const BlogContent = markdownFile?.content as JSXElementConstructor<any>
	const title = markdownFile?.title
	const description = markdownFile?.description

	console.log('TODO: add meta - BlogArticle')

	if (!markdownFile) {
		return (
			<div>
				<Link href="/blog">
					← <TransClient>Retour à la liste des articles</TransClient>
				</Link>
				<br />
				<TransClient>
					Oups, nous n'avons pas d'article correspondant
				</TransClient>
			</div>
		)
	}

	return (
		<PageLayout shouldShowMenu>
			<div className="flex max-w-[800px] flex-col">
				<Link href="/blog">
					← <TransClient>Retour à la liste des articles</TransClient>
				</Link>

				<BlogContent />
			</div>
		</PageLayout>
	)
}
