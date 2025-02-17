import DidYouKnowSlider from '@/components/landing-pages/DidYouKnowSlider'
import TransServer from '@/components/translation/trans/TransServer'

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
            <TransServer locale={locale}>
              La production d’un ordinateur nécessite 195 000 litres d’eau.
            </TransServer>
          ),
          highlight: (
            <TransServer locale={locale}>Considérable, non ?</TransServer>
          ),
        },
        {
          illustration: '/images/icons/icone-jeans.svg',
          content: (
            <TransServer locale={locale}>
              L’empreinte eau d'un jean est de 30 000 litres d'eau.
            </TransServer>
          ),
          highlight: (
            <TransServer locale={locale}>Impressionnant, non ?</TransServer>
          ),
        },
        {
          illustration: '/images/icons/icone-oeuf.svg',
          content: (
            <TransServer locale={locale}>
              Il faut 75 litres d’eau pour produire un oeuf.
            </TransServer>
          ),
          highlight: (
            <TransServer locale={locale}>Considérable, non ?</TransServer>
          ),
        },
      ]}
    />
  )
}
