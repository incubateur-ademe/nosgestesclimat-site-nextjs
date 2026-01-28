import {
  LIST_MAIN_NEWSLETTER,
  LIST_NOS_GESTES_ALIMENTATION_NEWSLETTER,
  LIST_NOS_GESTES_LOGEMENT_NEWSLETTER,
  LIST_NOS_GESTES_TRANSPORT_NEWSLETTER,
} from '@/constants/brevo'
import Emoji from '@/design-system/utils/Emoji'
import { t } from '@/helpers/metadata/fakeMetadataT'

export const NEWSLETTERS = [
  {
    id: LIST_MAIN_NEWSLETTER,
    title: (
      <>
        {t(
          'newsletterManagement.mainNewsletter.title',
          'Les actualités de Nos Gestes Climat'
        )}{' '}
        <Emoji>🌱</Emoji>
      </>
    ),
    description: t(
      'newsletterManagement.mainNewsletter.description',
      "Nos dernières évolutions et nos recommandations d'actions, les articles récents, les nouvelles formations, et plus encore. Une fois par mois"
    ),
    'data-testid': 'newsletter-saisonniere-checkbox',
  },
  {
    id: LIST_NOS_GESTES_TRANSPORT_NEWSLETTER,
    title: (
      <>
        {t(
          'newsletterManagement.transportNewsletter.title',
          'Nos Gestes Transports'
        )}{' '}
        <Emoji>🚗</Emoji>
      </>
    ),
    description: t(
      'newsletterManagement.transportNewsletter.description',
      "4 infolettres (sur 4 semaines), pour comprendre l'impact de nos déplacements et agir concrètement. Pour avancer vers des trajets plus légers"
    ),
    'data-testid': 'newsletter-transports-checkbox',
  },
  {
    id: LIST_NOS_GESTES_LOGEMENT_NEWSLETTER,
    title: (
      <>
        {t(
          'newsletterManagement.logementNewsletter.title',
          'Nos Gestes Logement'
        )}{' '}
        <Emoji>🏠</Emoji>
      </>
    ),
    description: t(
      'newsletterManagement.logementNewsletter.description',
      "3 infolettres (sur 3 semaines), pour découvrir comment nos choix d'habitat influencent notre empreinte carbone. Pour un logement plus sobre et confortable."
    ),
    'data-testid': 'newsletter-logement-checkbox',
  },
  {
    id: LIST_NOS_GESTES_ALIMENTATION_NEWSLETTER,
    title: (
      <>
        {t(
          'newsletterManagement.alimentationNewsletter.title',
          'Nos Gestes Alimentation'
        )}{' '}
        <Emoji>🍎</Emoji>
      </>
    ),
    description: t(
      'newsletterManagement.alimentationNewsletter.description',
      "4 infolettres (sur 4 semaines), pour découvrir l'empreinte de notre alimentation, et comprendre comment aligner son assiette avec les enjeux planétaires."
    ),
    'data-testid': 'newsletter-alimentation-checkbox',
  },
]
