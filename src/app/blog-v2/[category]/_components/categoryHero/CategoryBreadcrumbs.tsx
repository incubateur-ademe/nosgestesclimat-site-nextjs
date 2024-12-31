import Breadcrumbs from '@/design-system/layout/Breadcrumbs'
import { getServerTranslation } from '@/helpers/getServerTranslation'

export default async function CategoryBreadcrumbs({
  slug,
  title,
}: {
  slug: string
  title: string
}) {
  const { t } = await getServerTranslation()
  return (
    <Breadcrumbs
      className="relative"
      items={[
        { href: '/blog-v2', label: t('Accueil Blog') },
        { href: `/blog-v2/${slug}`, label: title, isActive: true },
      ]}
    />
  )
}
