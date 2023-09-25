'use client'

import Link from '@/components/Link'
import Meta from '@/components/misc/Meta'
import Trans from '@/components/translation/Trans'
import { useParams } from 'next/navigation'
import { JSXElementConstructor } from 'react'
import { blogData } from '../_data/articles'

export default function BlogPost() {
  const { slug } = useParams()
  const markdownFile = blogData.find(
    (element) => element.slug == decodeURI(slug as string)
  )
  const BlogContent = markdownFile?.content as JSXElementConstructor<any>
  console.log({ markdownFile })
  if (!markdownFile) {
    return (
      <div>
        <Link href="/blog">
          ← <Trans>Retour à la liste des articles</Trans>
        </Link>
        <br />
        <Trans>Oups, nous n'avons pas d'article correspondant</Trans>
      </div>
    )
  }

  return (
    <div className="flex max-w-[800px] flex-col gap-4 p-8">
      <Link href="/blog">
        ← <Trans>Retour à la liste des articles</Trans>
      </Link>

      <Meta
        title={markdownFile?.title}
        description={markdownFile?.description}
      />

      <BlogContent />
    </div>
  )
}
