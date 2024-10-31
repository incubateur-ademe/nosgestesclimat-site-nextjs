import DidYouKnowSlider from '@/components/landing-pages/DidYouKnowSlider'
import Trans from '@/components/translation/Trans'

export default function DidYouKnowMainLanding() {
  return (
    <DidYouKnowSlider
      slides={[
        {
          illustration: '/images/icons/computer.svg',
          content: (
            <Trans>
              L'empreinte carbone moyenne d'un français est de{' '}
              <strong className="text-primary-600">
                9,1 tonnes de CO2e par an
              </strong>
              .
            </Trans>
          ),
          highlight: <Trans>Et la vôtre ?</Trans>,
        },
        {
          illustration: '/images/icons/tee-shirt.svg',
          content: (
            <Trans>
              La production d'un jean nécessite près de{' '}
              <strong className="text-primary-600">30 000 litres d'eau</strong>.
            </Trans>
          ),
          highlight: <Trans>Considérable, non ?</Trans>,
        },
        {
          illustration: '/images/icons/tee-shirt.svg',
          content: (
            <Trans>
              L'empreinte eau moyenne d'un français se compte{' '}
              <strong className="text-primary-600">
                milliers de litres par jour
              </strong>
              .
            </Trans>
          ),
          highlight: <Trans>Et la vôtre ?</Trans>,
        },
        {
          illustration: '/images/icons/electricity.svg',
          content: (
            <Trans>
              Un aller-retour Paris-Athènes en avion représente{' '}
              <strong className="text-primary-600">800 kg de CO2e</strong>.
            </Trans>
          ),
          highlight: <Trans>Impressionnant, non ?</Trans>,
        },
      ]}
    />
  )
}