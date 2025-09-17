import { getPosts } from '@/helpers/markdown/getPosts'
import { fetchAllArticleTitlesAndSlugs } from '@/services/cms/fetchAllArticleTitlesAndSlugs'
import { fetchThematicLandingPages } from '@/services/cms/fetchThematicLandingPages'
import rules from '@incubateur-ademe/nosgestesclimat/public/co2-model.FR-lang.fr-opti.json'
import type { MetadataRoute } from 'next'
import { utils } from 'publicodes'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = new Set([
    '',
    'actions',
    'accessibilité',
    'amis',
    'a-propos',
    'blog',
    'budget',
    'cgu',
    'classements',
    'contact',
    'diffuser',
    'documentation/guide',
    'documentation/modele',
    'documentation',
    'empreinte-carbone',
    'empreinte-eau',
    'fin',
    'guide',
    'international',
    'mentions-legales',
    'mentions-legales-base-empreinte',
    'modele',
    'nos-relais',
    'nouveautes',
    'northstar',
    'organisations',
    'partage',
    'partenaire',
    'personas',
    'plan-du-site',
    'politique-de-confidentialite',
    'politique-des-cookies',
    'profil',
    'questions',
    'questions-frequentes',
    'stats',
  ])

  const staticUrls = Array.from(staticPages).map((page) => ({
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

  const blogPosts = await fetchAllArticleTitlesAndSlugs({ locale: 'fr' })

  const blogUrls = blogPosts.map((post) => ({
    url: `https://nosgestesclimat.fr/blog/${post.blogCategory?.slug}/${post.slug}`,
    lastModified: new Date(),
    priority: 1,
  }))

  const releasePosts = getPosts('src/locales/nouveautes/fr/')
  const releaseUrls = releasePosts.map((post) => ({
    url: `https://nosgestesclimat.fr/nouveautes/${post.slug}`,
    lastModified: new Date(),
    priority: 0.6,
  }))

  const thematicLandingPagesResult = await fetchThematicLandingPages()
  const thematicLandingUrls =
    thematicLandingPagesResult?.thematicLandingPages?.map((page) => ({
      url: `https://nosgestesclimat.fr/themes/${page.slug}`,
      lastModified: new Date(),
      priority: 0.8,
    })) || []

  return [
    ...staticUrls,
    ...blogUrls,
    ...releaseUrls,
    ...documentationUrls,
    ...thematicLandingUrls,
  ]
}
