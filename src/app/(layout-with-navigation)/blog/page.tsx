import PasserTestBanner from '@/components/layout/PasserTestBanner'
import List from '@/components/posts/List'
import Trans from '@/components/translation/Trans'
import Title from '@/design-system/layout/Title'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getPosts } from '@/helpers/markdown/getPosts'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'

export async function generateMetadata() {
  const { t } = await getServerTranslation()

  return getMetadataObject({
    title: t('Blog - Nos Gestes Climat'),
    description: t('Découvrez les articles de blog du site Nos Gestes Climat.'),
    alternates: {
      canonical: '/blog',
    },
  })
}

export default async function Blog() {
  const posts = await getPosts('src/locales/blog/fr/')

  return (
    <>
      <PasserTestBanner />

      <Title title={<Trans>Le Blog</Trans>} data-cypress-id="blog-title" />

      <p>
        <Trans>Découvrez nos articles de blog&nbsp;:</Trans>
      </p>

      <List items={posts} path="/blog" />
    </>
  )
}
