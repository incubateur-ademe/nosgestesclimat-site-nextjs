import UnderstandToAct from '@/components/landing-pages/UnderstandToAct'
import Trans from '@/components/translation/trans/TransServer'
import { getServerTranslation } from '@/helpers/getServerTranslation'

export default async function DecryptChallenges({
  locale,
}: {
  locale: string
}) {
  const { t } = await getServerTranslation(locale)

  return (
    <UnderstandToAct
      locale={locale}
      pathname={'/'}
      title={
        <Trans locale={locale}>Décryptez les défis environnementaux</Trans>
      }
      posts={[
        {
          title: (
            <Trans locale={locale}>
              Le lexique pour tout comprendre à l'eau
            </Trans>
          ),
          category: <Trans locale={locale}>Empreinte eau</Trans>,
          imageSrc: '/images/blog/seo/lexique-eau.jpg',
          imageAlt: t(
            "Un champ arrosé, illustrant le lexique pour comprendre l'empreinte eau"
          ),
          href: '/blog/environnement/lexique-eau-tout-comprendre',
        },
        {
          title: (
            <Trans locale={locale}>
              Transports : les modes à fuir, ceux à chérir
            </Trans>
          ),
          category: <Trans locale={locale}>Empreinte carbone</Trans>,
          imageSrc: '/images/blog/seo/empreinte-carbone-transports.jpg',
          imageAlt: t(
            "Deux mini-vans, illustrant l'empreinte carbone des transports"
          ),
          href: '/blog/mobilites/transports-fuir-transports-cherir',
        },
        {
          title: (
            <Trans locale={locale}>
              L’empreinte carbone : une empreinte parmi d’autres !
            </Trans>
          ),
          category: <Trans locale={locale}>Empreinte carbone</Trans>,
          imageSrc: '/images/blog/seo/agir-reduire-empreinte-carbone.jpg',
          imageAlt: t(
            'Une manifestation pour le climat, illustrant les actions pour réduire son empreinte carbone'
          ),
          href: '/blog/environnement/carbone-empreinte-parmi-autres',
        },
      ]}
    />
  )
}
