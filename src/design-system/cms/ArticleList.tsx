import DidYouKnowMainLanding from '@/app/_components/DidYouKnowMainLanding'
import PostThumbnail from '@/design-system/cms/PostThumbnail'
import type { ArticleType } from '@/types/blog'
import Pagination from './articleList/Pagination'

export default function ArticleList({
  articles,
  pageCount,
  currentPage,
}: {
  articles: ArticleType[]
  pageCount: number
  currentPage: number
}) {
  return (
    <section className="mt-20 scroll-mt-40" id="articles">
      <ul className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {articles.slice(0, 6).map((article: ArticleType) => (
          <li key={article.documentId}>
            <PostThumbnail
              title={article.title}
              category={article.category?.title ?? ''}
              imageSrc={article.image?.url ?? ''}
              imageAlt={article.image?.alternativeText ?? ''}
              href={`/blog/${article.category?.slug}/${article.slug}`}
              trackingEvent={['blog', 'article', article.slug]}
            />
          </li>
        ))}
      </ul>

      <DidYouKnowMainLanding className="my-20 overflow-hidden rounded-lg px-10" />

      <ul className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {articles.slice(6).map((article) => (
          <li key={article.documentId}>
            <PostThumbnail
              title={article.title}
              category={article.category?.title ?? ''}
              imageSrc={article.image?.url ?? ''}
              imageAlt={article.image?.alternativeText ?? ''}
              href={`/blog/${article.category?.slug}/${article.slug}`}
              trackingEvent={['blog', 'article', article.slug]}
            />
          </li>
        ))}
      </ul>

      {pageCount > 1 && (
        <Pagination currentPage={currentPage} totalPages={pageCount} />
      )}
    </section>
  )
}
