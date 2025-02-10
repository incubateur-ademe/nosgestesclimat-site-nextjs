import type { ArticleType } from '@/adapters/cmsClient'
import JSONLD from '@/components/seo/JSONLD'

export default function ArticleJSONLD({ article }: { article: ArticleType }) {
  return (
    <JSONLD
      jsonLd={[
        {
          '@context': 'https://schema.org/',
          '@type': 'BlogPosting',
          headline: article.title,
          datePublished: article.publishedAt,
          dateModified: article.updatedAt,
          image: {
            '@type': 'imageObject',
            url: article.image?.url,
            height: '640',
            width: '800',
          },
          author: {
            '@type': 'Person',
            name: article.author?.name,
          },
        },
      ]}
    />
  )
}
