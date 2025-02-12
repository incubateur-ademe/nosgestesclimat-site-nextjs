import DidYouKnowSlider from '@/components/landing-pages/DidYouKnowSlider'
import TransServer from '@/components/translation/trans/TransServer'

export default function DidYouKnowMainLanding({
  locale,
  className,
}: {
  locale: string
  className?: string
}) {
  return (
    <DidYouKnowSlider
      className={className}
      slides={[
        {
          illustration: '/images/icons/icone-ordinateur.svg',
          content: (
            <TransServer locale={locale}>
              L'empreinte carbone moyenne d'un français est de{' '}
              <strong className="text-primary-600">
                9,1 tonnes de CO2e par an
              </strong>
              .
            </TransServer>
          ),
          highlight: <TransServer locale={locale}>Et la vôtre ?</TransServer>,
        },
        {
          illustration: '/images/icons/icone-jeans.svg',
          content: (
            <TransServer locale={locale}>
              La production d'un jean nécessite près de{' '}
              <strong className="text-primary-600">30 000 litres d'eau</strong>.
            </TransServer>
          ),
          highlight: (
            <TransServer locale={locale}>Considérable, non ?</TransServer>
          ),
        },
        {
          illustration: '/images/icons/icone-goutte.svg',
          content: (
            <TransServer locale={locale}>
              L'empreinte eau moyenne d'un français se compte{' '}
              <strong className="text-primary-600">
                milliers de litres par jour
              </strong>
              .
            </TransServer>
          ),
          highlight: <TransServer locale={locale}>Et la vôtre ?</TransServer>,
        },
        {
          illustration: '/images/icons/icone-avion.svg',
          content: (
            <TransServer locale={locale}>
              Un aller-retour Paris-Athènes en avion représente{' '}
              <strong className="text-primary-600">800 kg de CO2e</strong>.
            </TransServer>
          ),
          highlight: (
            <TransServer locale={locale}>Impressionnant, non ?</TransServer>
          ),
        },
      ]}
    />
  )
}
