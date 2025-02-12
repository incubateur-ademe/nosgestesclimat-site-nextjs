import Breadcrumbs from '@/design-system/layout/Breadcrumbs'
import { getServerTranslation } from '@/helpers/getServerTranslation'

export default async function ArticleBreadcrumbs({
  locale,
  categorySlug,
  categoryTitle,
  articleTitle,
  articleSlug,
}: {
  locale: string
  categorySlug: string
  categoryTitle: string
  articleTitle: string
  articleSlug: string
}) {
  const { t } = await getServerTranslation(locale)

  return (
    <Breadcrumbs
      className="relative mb-10"
      linkClassName="normal-case"
      items={[
        { href: '/blog', label: t('Accueil Blog') },
        { href: `/blog/${categorySlug}`, label: categoryTitle },
        {
          href: `/blog/${categorySlug}/${articleSlug}`,
          label: articleTitle,
          isActive: true,
        },
      ]}
    />
  )
}
