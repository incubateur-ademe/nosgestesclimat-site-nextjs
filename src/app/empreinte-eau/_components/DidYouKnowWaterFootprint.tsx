import DidYouKnowSlider from '@/components/landing-pages/DidYouKnowSlider'
import Trans from '@/components/translation/Trans'

export default function DidYouKnowWaterFootprint() {
  return (
    <DidYouKnowSlider
      slides={[
        {
          illustration: '/images/icons/computer.svg',
          content: (
            <Trans>
              La production d’un ordinateur nécessite 195 000 litres d’eau.
            </Trans>
          ),
          highlight: <Trans>Considérable, non ?</Trans>,
        },
        {
          illustration: '/images/icons/jeans.svg',
          content: (
            <Trans>L’empreinte eau d'un jean est de 30 000 litres d'eau.</Trans>
          ),
          highlight: <Trans>Impressionnant, non ?</Trans>,
        },
        {
          illustration: '/images/icons/egg.svg',
          content: (
            <Trans>Il faut 75 litres d’eau pour produire un oeuf.</Trans>
          ),
          highlight: <Trans>Considérable, non ?</Trans>,
        },
      ]}
    />
  )
}
