import UnderstandToAct from '@/components/landing-pages/UnderstandToAct'
import Trans from '@/components/translation/Trans'
import { getServerTranslation } from '@/helpers/getServerTranslation'

export default async function DecryptChallenges() {
  const { t } = await getServerTranslation()

  return (
    <UnderstandToAct
      title={<Trans>Décryptez les défis environnementaux</Trans>}
      posts={[
        {
          title: <Trans>Le lexique pour tout comprendre à l'eau</Trans>,
          category: <Trans>Empreinte eau</Trans>,
          imageSrc: '/images/blog/seo/lexique-eau.jpg',
          imageAlt: t(
            "Un champ arrosé, illustrant le lexique pour comprendre l'empreinte eau"
          ),
          href: '/blog/lexique-eau-tout-comprendre',
        },
        {
          title: <Trans>Transports : les modes à fuir, ceux à chérir</Trans>,
          category: <Trans>Empreinte carbone</Trans>,
          imageSrc: '/images/blog/seo/empreinte-carbone-transports.jpg',
          imageAlt: t(
            "Deux mini-vans, illustrant l'empreinte carbone des transports"
          ),
          href: '/blog/transports-fuir-transports-cherir',
        },
        {
          title: (
            <Trans>L’empreinte carbone : une empreinte parmi d’autres !</Trans>
          ),
          category: <Trans>Empreinte carbone</Trans>,
          imageSrc: '/images/blog/seo/agir-reduire-empreinte-carbone.jpg',
          imageAlt: t(
            'Une manifestation pour le climat, illustrant les actions pour réduire son empreinte carbone'
          ),
          href: '/blog/carbone-empreinte-parmi-autres',
        },
      ]}
    />
  )
}
