import DidYouKnowMainLanding from '@/app/[locale]/_components/DidYouKnowMainLanding'
import Trans from '@/components/translation/trans/TransServer'
import PostThumbnail from '@/design-system/cms/PostThumbnail'
import { getPostThumbnailClickEvent } from '@/helpers/tracking/blog'
import type { ArticleItemType } from '../../adapters/cmsClient'
import Pagination from './articleList/Pagination'

export default function ArticleList({
  articles,
  pageCount,
  currentPage,
  locale,
}: {
  articles: ArticleItemType[]
  pageCount: number
  currentPage: number
  locale: string
}) {
  return (
    <section className="mb-20 scroll-mt-40" id="articles">
      <h2 className="mb-8 font-medium">
        <Trans locale={locale}>Nos derniers articles</Trans>
      </h2>
      <ul
        className="grid grid-cols-1 gap-8 md:grid-cols-3"
        data-cypress-id="blog-list">
        {articles.slice(0, 6).map((article) => (
          <li key={article.documentId} className="h-full">
            <PostThumbnail
              title={article.title}
              category={article.category?.title ?? ''}
              imageSrc={article.image?.url ?? ''}
              imageAlt={article.image?.alternativeText ?? ''}
              href={`/blog/${article.category?.slug}/${article.slug}`}
              trackingEvent={getPostThumbnailClickEvent(article.slug)}
              className="bg-gray-50"
            />
          </li>
        ))}
      </ul>

      <DidYouKnowMainLanding
        locale={locale}
        className="mt-20 overflow-hidden rounded-lg px-10"
        titleTag="h3"
      />

      {articles.length > 6 && (
        <ul className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
          {articles.slice(6).map((article) => (
            <li key={article.documentId}>
              <PostThumbnail
                title={article.title}
                category={article.category?.title ?? ''}
                imageSrc={article.image?.url ?? ''}
                imageAlt={article.image?.alternativeText ?? ''}
                href={`/blog/${article.category?.slug}/${article.slug}`}
                trackingEvent={['blog', 'article', article.slug]}
                className="bg-gray-50"
              />
            </li>
          ))}
        </ul>
      )}

      {pageCount > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={pageCount}
          locale={locale}
        />
      )}
    </section>
  )
}
