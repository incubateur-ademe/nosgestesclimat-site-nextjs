import UnderstandToAct from '@/components/landing-pages/UnderstandToAct'
import { getServerTranslation } from '@/helpers/getServerTranslation'

export default async function UnderstandToActWaterFootprint({
  pathname,
  locale,
}: {
  pathname: string
  locale: string
}) {
  const { t } = await getServerTranslation({ locale })

  return (
    <UnderstandToAct
      locale={locale}
      pathname={pathname}
      description="<p class='mb-0'>Mieux comprendre <strong class='text-primary-600'>notre impact sur les ressources en eau</strong> est essentiel pour pouvoir agir efficacement. À travers une série d'articles, nous vous proposons des conseils pratiques, des idées inspirantes et des informations clés pour <strong class='text-primary-600'>réduire votre empreinte eau</strong>.</p>"
      posts={[
        {
          category: t('Empreinte eau'),
          title: t("Le lexique pour tout comprendre à l'empreinte eau"),
          href: '/blog/environnement/lexique-eau-tout-comprendre',
          imageSrc:
            'https://nosgestesclimat-prod.s3.fr-par.scw.cloud/cms/medium_philip_junior_mail_Bp_Uk_WK_6hf_JA_unsplash_0f0f3b01c2.jpg',
        },
        {
          category: t('Empreinte eau'),
          title: t(
            'Les 3 réflexes à adopter pour une garde-robe économe en eau'
          ),
          href: '/blog/consommation/reflexes-textile-econome-empreinte-eau',
          imageSrc:
            'https://nosgestesclimat-prod.s3.fr-par.scw.cloud/cms/medium_priscilla_du_preez_9d7a6e02a2.jpg',
        },
        {
          category: t('Empreinte eau'),
          title: t(
            "L'empreinte eau : pourquoi et comment avons-nous travaillé"
          ),
          href: '/blog/actualites-et-fonctionnalites/empreinte-eau-pourquoi-comment',
          imageSrc:
            'https://nosgestesclimat-prod.s3.fr-par.scw.cloud/cms/medium_trisha_downing_champ_coton_3ffd08e0f4.jpg',
        },
      ]}
    />
  )
}
