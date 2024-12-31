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
    <div className="relative mt-10 py-8">
      <div className="absolute -left-1/2 top-0 h-full w-[200%] bg-gray-100" />
      <h2 className="relative mb-8">
        <Trans>D'autres articles sur le même sujet</Trans>
      </h2>

      <div className="relative flex flex-col gap-4 md:grid md:grid-cols-3">
        {articles.map((article) => (
          <PostThumbnail
            key={article.slug}
            title={article.title}
            imageSrc={article.image.url}
            imageAlt={article.image.alternativeText}
            href={`/blog-v2/${article.category.slug}/${article.slug}`}
            trackingEvent={['blog', 'other-articles']}
            category={article.category.title}
          />
        ))}
      </div>
    </div>
  )
}
