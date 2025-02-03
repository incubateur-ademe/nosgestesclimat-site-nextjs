import type { ArticleType } from '@/adapters/cmsClient'
import Trans from '@/components/translation/Trans'
import PostThumbnail from '@/design-system/cms/PostThumbnail'

export default function OtherArticles({
  articles,
}: {
  articles: ArticleType[] | undefined
}) {
  if (!articles || articles.length === 0) return null

  return (
    <div className="mt-10 bg-gray-100 py-8">
      <div className="max-w-5xl md:mx-auto">
        <h2 className="relative mb-8">
          <Trans>D'autres articles sur le même sujet</Trans>
        </h2>

        <div className="relative flex flex-col gap-4 md:grid md:grid-cols-3">
          {articles.map((article) => (
            <PostThumbnail
              key={article.slug}
              title={article.title}
              imageSrc={article.image?.url ?? ''}
              imageAlt={article.image?.alternativeText ?? ''}
              href={`/blog/${article.category?.slug}/${article.slug}`}
              trackingEvent={['blog', 'other-articles']}
              category={article.category?.title ?? ''}
              className="bg-white"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
