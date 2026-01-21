import {
  MON_ESPACE_ACTIONS_PATH,
  MON_ESPACE_GROUPS_PATH,
  MON_ESPACE_PATH,
  MON_ESPACE_SETTINGS_PATH,
} from '@/constants/urls/paths'
import { getPosts } from '@/helpers/markdown/getPosts'
import { fetchAllArticleTitlesAndSlugs } from '@/services/cms/fetchAllArticleTitlesAndSlugs'
import { fetchThematicLandingPages } from '@/services/cms/fetchThematicLandingPages'
import rules from '@incubateur-ademe/nosgestesclimat/public/co2-model.FR-lang.fr-opti.json'
import type { MetadataRoute } from 'next'
import { utils } from 'publicodes'

// Documentation rules to exclude from sitemap (redirections or invalid pages)
const excludedDocumentationPatterns = [
  // Redirections - divers
  'divers . nombre par tranche de x m2 . nombre de tranches',
  'divers . nombre par tranche de x m2 . tranche',
  'divers . textile . indice de durabilité moyen . nombre total',
  // Redirections - logement vacances résidence secondaire
  'logement . vacances . résidence secondaire . localisation . littoral nord-ouest . facteur saison . facteur surtout été',
  'logement . vacances . résidence secondaire . localisation . montagne . facteur saison . facteur hiver',
  'logement . vacances . résidence secondaire . localisation . montagne . facteur saison . facteur été',
  'logement . vacances . résidence secondaire . localisation . littoral méditerranéen . facteur saison . facteur été',
  'logement . vacances . résidence secondaire . localisation . montagne . facteur saison . facteur surtout été',
  'logement . vacances . résidence secondaire . localisation . campagne . facteur saison . facteur surtout hiver',
  'logement . vacances . résidence secondaire . localisation . ville . facteur saison . facteur surtout été',
  'logement . vacances . résidence secondaire . localisation . littoral méditerranéen . facteur saison . facteur surtout hiver',
  'logement . vacances . résidence secondaire . localisation . littoral méditerranéen . facteur saison . facteur hiver',
  'logement . vacances . résidence secondaire . localisation . campagne . facteur saison . facteur été',
  'logement . vacances . résidence secondaire . localisation . montagne . facteur saison . facteur surtout hiver',
  'logement . vacances . résidence secondaire . localisation . ville . facteur saison . facteur hiver',
  'logement . vacances . résidence secondaire . localisation . ville . facteur saison . facteur été',
  'logement . vacances . résidence secondaire . localisation . littoral nord-ouest . facteur saison . facteur surtout hiver',
  'logement . vacances . résidence secondaire . localisation . littoral nord-ouest . facteur saison . facteur été',
  'logement . vacances . résidence secondaire . localisation . campagne . facteur saison . facteur hiver',
  'logement . vacances . résidence secondaire . localisation . littoral méditerranéen . facteur saison . facteur surtout été',
  'logement . vacances . résidence secondaire . localisation . ville . facteur saison . facteur surtout hiver',
  'logement . vacances . résidence secondaire . localisation . littoral nord-ouest . facteur saison . facteur hiver',
  'logement . vacances . résidence secondaire . localisation . campagne . facteur saison . facteur surtout été',
  // Redirections - logement chauffage
  'logement . chauffage . précision consommation . saisie DPE . F',
  'logement . chauffage . précision consommation . saisie DPE . G',
  'logement . chauffage . précision consommation . saisie DPE . B',
  'logement . chauffage . précision consommation . saisie DPE . D',
  'logement . chauffage . précision consommation . saisie DPE . A',
  'logement . chauffage . précision consommation . saisie DPE . E',
  'logement . chauffage . précision consommation . saisie DPE . C',
  'logement . chauffage-collectif . individuel',
  'logement . chauffage-collectif . collectif',
  // Redirections - transport
  'transport . voiture . boulot . sans voiture . type . TER',
  'transport . voiture . boulot . sans voiture . type . trotinette électrique',
  'transport . voiture . boulot . sans voiture . type . métro ou tramway',
  'transport . voiture . boulot . sans voiture . type . bus',
  'transport . voiture . boulot . sans voiture . type . vélo électrique',
  'transport . voiture . boulot . sans voiture . type . vélo classique',
  // Redirections - métrique
  'métrique . carbone',
  'métrique . eau',
]

const excludedDocumentationSet = new Set(excludedDocumentationPatterns)

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = new Set([
    '',
    'blog',
    'budget',
    'cgu',
    'contact',
    'diffuser',
    'documentation',
    'empreinte-carbone',
    'empreinte-eau',
    'international',
    'mentions-legales',
    'mentions-legales-base-empreinte',
    'modele',
    'nos-relais',
    'nouveautes',
    'organisations',
    'personas',
    'plan-du-site',
    'politique-de-confidentialite',
    'questions',
    'questions-frequentes',
    'stats',
    MON_ESPACE_PATH,
    MON_ESPACE_GROUPS_PATH,
    MON_ESPACE_ACTIONS_PATH,
    MON_ESPACE_SETTINGS_PATH,
  ])

  const staticUrls = Array.from(staticPages).map((page) => ({
    url: `https://nosgestesclimat.fr/${page}`,
    lastModified: new Date(),
    priority: 0.8,
  }))

  const documentationUrls = Object.keys(rules)
    .filter((dottedName) => !excludedDocumentationSet.has(dottedName))
    .map((dottedName) => ({
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
