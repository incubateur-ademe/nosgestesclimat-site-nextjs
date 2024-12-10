import DidYouKnowMainLanding from '@/app/_components/DidYouKnowMainLanding'
import PostThumbnail from '@/design-system/cms/PostThumbnail'
import type { ArticleType } from '@/types/blog'

export default function ArticleList({ articles }: { articles: ArticleType[] }) {
  return (
    <>
      <ul>
        {articles.slice(0, 6).map((article: ArticleType) => (
          <li key={article.id}>
            <PostThumbnail
              title={article.title}
              category={article.category.title}
              imageSrc={article.image.url}
              imageAlt={article.image.alternativeText}
              href={`/blog/${article.category.slug}/${article.slug}`}
              trackingEvent={['blog', 'article', article.slug]}
            />
          </li>
        ))}
      </ul>

      <DidYouKnowMainLanding className="bg-white" />

      <ul>
        {articles.slice(6).map((article) => (
          <li key={article.id}>
            <PostThumbnail
              title={article.title}
              category={article.category.title}
              imageSrc={article.image.url}
              imageAlt={article.image.alternativeText}
              href={`/blog/${article.category.slug}/${article.slug}`}
              trackingEvent={['blog', 'article', article.slug]}
            />
          </li>
        ))}
      </ul>
    </>
  )
}
