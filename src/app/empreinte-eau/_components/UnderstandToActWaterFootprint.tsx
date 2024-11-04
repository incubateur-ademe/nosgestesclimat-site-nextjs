import UnderstandToAct from '@/components/landing-pages/UnderstandToAct'
import Trans from '@/components/translation/Trans'
import { getServerTranslation } from '@/helpers/getServerTranslation'

export default async function UnderstandToActWaterFootprint() {
  const { t } = await getServerTranslation()

  return (
    <UnderstandToAct
      description={
        <p className="mb-0">
          <Trans>
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
          </Trans>
        </p>
      }
      posts={[
        {
          category: t('Empreinte eau'),
          title: t("Le lexique pour tout comprendre à l'empreinte eau"),
          href: '/blog/lexique-eau-tout-comprendre',
          imageSrc: '/images/blog/philip-junior-mail-arroser-champ.jpg',
        },
        {
          category: t('Empreinte eau'),
          title: t(
            'Les 3 réflexes à adopter pour une garde-robe économe en eau'
          ),
          href: '/blog/reflexes-textile-econome-empreinte-eau',
          imageSrc: '/images/blog/priscilla-du-preez-garde-robe.jpg',
        },
        {
          category: t('Empreinte eau'),
          title: t(
            "L'empreinte eau : pourquoi et comment avons-nous travaillé"
          ),
          href: '/blog/empreinte-eau-pourquoi-comment',
          imageSrc: '/images/blog/trisha-downing-champ-coton.jpg',
        },
      ]}
    />
  )
}
