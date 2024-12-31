import Breadcrumbs from '@/design-system/layout/Breadcrumbs'
import { getServerTranslation } from '@/helpers/getServerTranslation'

export default async function ArticleBreadcrumbs({
  categorySlug,
  categoryTitle,
  articleTitle,
  articleSlug,
}: {
  categorySlug: string
  categoryTitle: string
  articleTitle: string
  articleSlug: string
}) {
  const { t } = await getServerTranslation()

  return (
    <Breadcrumbs
      className="relative"
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
