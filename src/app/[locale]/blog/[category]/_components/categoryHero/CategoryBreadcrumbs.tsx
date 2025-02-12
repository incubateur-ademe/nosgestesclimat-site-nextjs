import Breadcrumbs from '@/design-system/layout/Breadcrumbs'
import { getServerTranslation } from '@/helpers/getServerTranslation'

export default async function CategoryBreadcrumbs({
  slug,
  title,
  locale,
}: {
  slug: string
  title: string
  locale: string
}) {
  const { t } = await getServerTranslation(locale)

  return (
    <Breadcrumbs
      className="relative"
      items={[
        { href: '/blog', label: t('Accueil Blog') },
        { href: `/blog/${slug}`, label: title, isActive: true },
      ]}
    />
  )
}
