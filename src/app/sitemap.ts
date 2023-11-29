import { NGC_MODEL_API_URL } from '@/constants/urls'
import { fetchModel } from '@/helpers/data/fetchModel'
import getPosts from '@/helpers/markdown/getPosts'
import { MetadataRoute } from 'next'
import { utils } from 'publicodes'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    '',
    'personas',
    'actions-plus',
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
  ]
  const staticUrls = staticPages.map((page) => ({
    url: `https://nosgestesclimat.fr/${page}`,
    lastModified: new Date(),
    priority: 0.8,
  }))

  const rules = await fetchModel({
    dataServer: NGC_MODEL_API_URL,
    regionCode: 'FR',
    locale: 'fr',
    isOptim: false,
  })
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

  const actionPosts = await getPosts(`src/locales/actions-plus/fr/`)
  const actionUrls = actionPosts.map((post) => ({
    url: `https://nosgestesclimat.fr/actions/plus/${post.slug}`,
    lastModified: new Date(),
    priority: 0.8,
  }))

  return [
    ...staticUrls,
    ...blogUrls,
    ...actionUrls,
    ...releaseUrls,
    ...documentationUrls,
  ]
}
