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
        { href: '/blog-v2', label: t('Accueil Blog') },
        { href: `/blog-v2/${categorySlug}`, label: categoryTitle },
        {
          href: `/blog-v2/${categorySlug}/${articleSlug}`,
          label: articleTitle,
          isActive: true,
        },
      ]}
    />
  )
}
