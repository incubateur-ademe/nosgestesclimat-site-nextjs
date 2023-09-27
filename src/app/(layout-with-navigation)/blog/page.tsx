import Trans from '@/components/translation/Trans'
import Title from '@/design-system/layout/Title'
import { Metadata } from 'next'
import Image from 'next/image'
import PostList from './_components/PostList'

export const metadata: Metadata = {
  title: 'Blog - Nos Gestes Climat',
  description: 'Découvrez les articles de blog du site Nos Gestes Climat.',
}

export default function Blog() {
  return (
    <>
      <Title title={<Trans>Le Blog</Trans>} data-cypress-id="blog-title" />

      <div className="flex flex-col gap-4">
        <Image
          alt=""
          className="h-[237px] w-full object-cover object-center"
          width={400}
          height={100}
          src="/images/misc/dessin-nosgestesclimat.png"
        />

        <p>
          <Trans>Découvrez nos articles de blog :</Trans>
        </p>
      </div>

      <PostList />
    </>
  )
}
