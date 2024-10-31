import UnderstandToAct from '@/components/landing-pages/UnderstandToAct'
import Trans from '@/components/translation/Trans'

export default function DecryptChallenges() {
  return (
    <UnderstandToAct
      title={<Trans>Décryptez les défis environnementaux</Trans>}
      posts={[
        {
          title: <Trans>Le lexique pour tout comprendre à l'eau</Trans>,
          category: <Trans>Empreinte eau</Trans>,
          imageSrc: '/images/blog/philip-junior-mail-arroser-champ.jpg',
          href: '/blog/lexique-eau-tout-comprendre',
        },
        {
          title: <Trans>Transports : les modes à fuir, ceux à chérir</Trans>,
          category: <Trans>Empreinte carbone</Trans>,
          imageSrc: '/images/blog/van-bus-velo-elviss-railijs-bitans.jpg',
          href: '/blog/transports-fuir-transports-cherir',
        },
        {
          title: (
            <Trans>L’empreinte carbone : une empreinte parmi d’autres !</Trans>
          ),
          category: <Trans>Empreinte carbone</Trans>,
          imageSrc: '/images/blog/markus-spiske-nature-future.jpg',
          href: '/blog/carbone-empreinte-parmi-autres',
        },
      ]}
    />
  )
}
