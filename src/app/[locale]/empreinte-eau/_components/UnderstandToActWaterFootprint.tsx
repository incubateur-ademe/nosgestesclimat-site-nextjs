import UnderstandToAct from '@/components/landing-pages/UnderstandToAct'
import TransServer from '@/components/translation/trans/TransServer'
import { getServerTranslation } from '@/helpers/getServerTranslation'

export default async function UnderstandToActWaterFootprint({
  pathname,
  locale,
}: {
  pathname: string
  locale: string
}) {
  const { t } = await getServerTranslation(locale)

  return (
    <UnderstandToAct
      locale={locale}
      pathname={pathname}
      description={
        <p className="mb-0">
          <TransServer locale={locale}>
            Mieux comprendre{' '}
            <strong className="text-primary-600">
              notre impact sur les ressources en eau
            </strong>{' '}
            est essentiel pour pouvoir agir efficacement. À travers une série
            d’articles, nous vous proposons des conseils pratiques, des idées
            inspirantes et des informations clés pour{' '}
            <strong className="text-primary-600">
              réduire votre empreinte eau
            </strong>
            .
          </TransServer>
        </p>
      }
      posts={[
        {
          category: t('Empreinte eau'),
          title: t("Le lexique pour tout comprendre à l'empreinte eau"),
          href: '/blog/environnement/lexique-eau-tout-comprendre',
          imageSrc: '/images/blog/seo/lexique-eau.jpg',
          imageAlt: t(
            "Un champ arrosé, illustrant le lexique pour comprendre l'empreinte eau"
          ),
        },
        {
          category: t('Empreinte eau'),
          title: t(
            'Les 3 réflexes à adopter pour une garde-robe économe en eau'
          ),
          href: '/blog/consommation/reflexes-textile-econome-empreinte-eau',
          imageSrc: '/images/blog/seo/textile-econome-eau.jpg',
          imageAlt: t('Une garde-robe économe en eau'),
        },
        {
          category: t('Empreinte eau'),
          title: t(
            "L'empreinte eau : pourquoi et comment avons-nous travaillé"
          ),
          href: '/blog/actualites-et-fonctionnalites/empreinte-eau-pourquoi-comment',
          imageSrc: '/images/blog/seo/champ-coton-empreinte-eau.jpg',
          imageAlt: t(
            "Un champ de coton, illustrant le calcul de l'empreinte eau"
          ),
        },
      ]}
    />
  )
}
