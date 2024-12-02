import DidYouKnowSlider from '@/components/landing-pages/DidYouKnowSlider'
import Trans from '@/components/translation/Trans'

export default function DidYouKnowCarbon() {
  return (
    <DidYouKnowSlider
      slides={[
        {
          illustration: '/images/icons/icone-trophee.svg',
          content: (
            <Trans>
              L'empreinte carbone moyenne d'un français est de{' '}
              <strong className="text-primary-600">
                9 tonnes de CO2e par an
              </strong>
              . Objectif 2050 : 2 tonnes !
            </Trans>
          ),
          highlight: <Trans>Et la vôtre ?</Trans>,
        },
        {
          illustration: '/images/icons/icone-avion.svg',
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
