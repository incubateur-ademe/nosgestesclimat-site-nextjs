import UnderstandToAct from '@/components/landing-pages/UnderstandToAct'
import Trans from '@/components/translation/trans/TransServer'
import type { Locale } from '@/i18nConfig'
import { fetchArticles } from '@/services/cms/fetchArticles'
import { getArticleHref } from '@/utils/cms/getArticleHref'

export default async function DecryptChallenges({
  locale,
}: {
  locale: Locale
}) {
  const { data: articles, isError } = await fetchArticles({
    params: {
      sort: 'createdAt:desc',
      'populate[0]': 'image',
      'populate[1]': 'category',
      'pagination[limit]': '3',
    },
    locale,
  })

  if (isError) return null

  return (
    <UnderstandToAct
      locale={locale}
      pathname={'/'}
      title={
        <Trans locale={locale}>Décryptez les défis environnementaux</Trans>
      }
      posts={articles.map(({ title, category, image, slug }) => ({
        title,
        category: category?.title ?? '',
        imageSrc: image?.url ?? '',
        imageAlt: image?.alternativeText ?? '',
        href: getArticleHref({
          categorySlug: category?.slug ?? '',
          articleSlug: slug,
        }),
      }))}
    />
  )
}
