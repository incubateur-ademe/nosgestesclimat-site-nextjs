import DidYouKnowSlider from '@/components/landing-pages/DidYouKnowSlider'
import Trans from '@/components/translation/trans/TransServer'

export default function DidYouKnowWaterFootprint({
  locale,
}: {
  locale: string
}) {
  return (
    <DidYouKnowSlider
      slides={[
        {
          illustration:
            'https://nosgestesclimat-prod.s3.fr-par.scw.cloud/cms/icone_ordinateur_2f234e6e03.svg',
          content: (
            <Trans locale={locale}>
              La production d’un ordinateur nécessite 195 000 litres d’eau.
            </Trans>
          ),
          highlight: <Trans locale={locale}>Considérable, non ?</Trans>,
        },
        {
          illustration:
            'https://nosgestesclimat-prod.s3.fr-par.scw.cloud/cms/icone_jeans_6bb7c35001.svg',
          content: (
            <Trans locale={locale}>
              L’empreinte eau d'un jean est de 30 000 litres d'eau.
            </Trans>
          ),
          highlight: <Trans locale={locale}>Impressionnant, non ?</Trans>,
        },
        {
          illustration:
            'https://nosgestesclimat-prod.s3.fr-par.scw.cloud/cms/icone_oeuf_f5a5dff2c4.svg',
          content: (
            <Trans locale={locale}>
              Il faut 75 litres d’eau pour produire un oeuf.
            </Trans>
          ),
          highlight: <Trans locale={locale}>Considérable, non ?</Trans>,
        },
      ]}
    />
  )
}
