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
          illustration: '/images/icons/icone-ordinateur.svg',
          content: (
            <Trans locale={locale}>
              La production d’un ordinateur nécessite 195 000 litres d’eau.
            </Trans>
          ),
          highlight: <Trans locale={locale}>Considérable, non ?</Trans>,
        },
        {
          illustration: '/images/icons/icone-jeans.svg',
          content: (
            <Trans locale={locale}>
              L’empreinte eau d'un jean est de 30 000 litres d'eau.
            </Trans>
          ),
          highlight: <Trans locale={locale}>Impressionnant, non ?</Trans>,
        },
        {
          illustration: '/images/icons/icone-oeuf.svg',
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
