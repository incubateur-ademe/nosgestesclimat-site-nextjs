// Create a pagination component that will be used to navigate through the pages 1, 2, 3, etc.
// using query params and only links
import ChevronLeft from '@/components/icons/ChevronLeft'
import ChevronRight from '@/components/icons/ChevronRight'
import Link from '@/components/Link'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { twMerge } from 'tailwind-merge'

export default async function Pagination({
  currentPage,
  totalPages,
  locale,
}: {
  currentPage: number
  totalPages: number
  locale: string
}) {
  const { t } = await getServerTranslation({ locale })
  return (
    <div className="text-center">
      <div className="relative mt-16 inline-flex items-center justify-center gap-3">
        {currentPage > 1 && (
          <Link
            className="absolute top-1/2 -left-6 -translate-y-1/2"
            href={`/${locale}/blog?page=${currentPage - 1}#articles`}
            aria-label={t('Page précédente')}>
            <ChevronLeft className="h-3 w-3" />
          </Link>
        )}

        <ul className="flex gap-3">
          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index}>
              <Link
                className={twMerge(
                  'text-lg',
                  currentPage === index + 1
                    ? 'text-primary-700 font-medium underline'
                    : 'text-gray-600! no-underline'
                )}
                href={`/${locale}/blog?page=${index + 1}#articles`}
                aria-label={t('Page {{page}}', { page: index + 1 })}>
                {index + 1}
              </Link>
            </li>
          ))}
        </ul>

        {currentPage < totalPages && (
          <Link
            className="absolute top-1/2 -right-6 -translate-y-1/2"
            href={`/${locale}/blog?page=${currentPage + 1}#articles`}
            aria-label={t('Page suivante')}>
            <ChevronRight className="h-3 w-3" />
          </Link>
        )}
      </div>
    </div>
  )
}
