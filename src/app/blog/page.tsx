'use client'

import dessinNGC from '@/assets/images/dessin-nosgestesclimat.png'
import PageLayout from '@/components/layout/PageLayout'
import TransClient from '@/components/translation/TransClient'
import Title from '@/design-system/layout/Title'
import { Metadata } from 'next'
import Image from 'next/image'
import PostListItem from './_components/PostListItem'
import { blogData } from './_data/articles'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Découvrez nos articles de blog.',
}

export default function Blog() {
  return (
    <PageLayout shouldShowMenu>
      <Title
        title={<TransClient>Le Blog</TransClient>}
        data-cypress-id="blog-title"
      />
      <div>
        <Image
          alt=""
          className="h-[237px] w-full object-cover object-center"
          width={400}
          height={100}
          src={dessinNGC}
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
    </PageLayout>
  )
}
