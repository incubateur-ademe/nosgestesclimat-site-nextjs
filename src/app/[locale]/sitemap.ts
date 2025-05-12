import { getPosts } from '@/helpers/markdown/getPosts'
import rules from '@incubateur-ademe/nosgestesclimat/public/co2-model.FR-lang.fr-opti.json'
import type { MetadataRoute } from 'next'
import { utils } from 'publicodes'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    '',
    'personas',
    'nouveautes',
    'a-propos',
    'contact',
    'vie-privee',
    'diffuser',
    'ambassadeurs',
    'faq',
    'stats',
    'blog',
    'documentation/guide',
    'documentation/modele',
    'documentation',
    'partenaire',
  ]
  const staticUrls = staticPages.map((page) => ({
    url: `https://nosgestesclimat.fr/${page}`,
    lastModified: new Date(),
    priority: 0.8,
  }))

  const documentationUrls = Object.keys(rules).map((dottedName) => ({
    url: `https://nosgestesclimat.fr/documentation/${utils.encodeRuleName(
      dottedName
    )}`,
    lastModified: new Date(),
    priority: 0.8,
  }))

  const blogPosts = await getPosts('src/locales/blog/fr/')
  const blogUrls = blogPosts.map((post) => ({
    url: `https://nosgestesclimat.fr/blog/${post.slug}`,
    lastModified: new Date(),
    priority: 1,
  }))

  const releasePosts = await getPosts('src/locales/nouveautes/fr/')
  const releaseUrls = releasePosts.map((post) => ({
    url: `https://nosgestesclimat.fr/nouveautes/${post.slug}`,
    lastModified: new Date(),
    priority: 0.6,
  }))

  return [...staticUrls, ...blogUrls, ...releaseUrls, ...documentationUrls]
}
