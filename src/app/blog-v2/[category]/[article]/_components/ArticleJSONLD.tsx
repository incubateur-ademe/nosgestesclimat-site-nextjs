import type { ArticleType } from '@/adapters/cmsClient'
import JSONLD from '@/components/seo/JSONLD'

export default function ArticleJSONLD({
  article,
  categorySlug,
  articleSlug,
}: {
  article: ArticleType
  categorySlug: string
  articleSlug: string
}) {
  return (
    <JSONLD
      jsonLd={[
        {
          '@context': 'https://schema.org/',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Accueil Blog',
              item: 'https://nosgestesclimat.fr/blog',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: article.category.title,
              item: `https://nosgestesclimat.fr/blog/${categorySlug}`,
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: article.title,
              item: `https://nosgestesclimat.fr/blog/${categorySlug}/${articleSlug}`,
            },
          ],
        },
      ]}
    />
  )
}
