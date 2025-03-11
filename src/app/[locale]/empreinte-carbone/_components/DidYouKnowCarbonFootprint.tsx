import DidYouKnowSlider from '@/components/landing-pages/DidYouKnowSlider'
import Trans from '@/components/translation/trans/TransServer'

export default function DidYouKnowCarbon({ locale }: { locale: string }) {
  return (
    <DidYouKnowSlider
      slides={[
        {
          illustration: '/images/icons/icone-trophee.svg',
          content: (
            <Trans locale={locale}>
              L'empreinte carbone moyenne d'un français est de{' '}
              <strong className="text-primary-600">
                9 tonnes de CO2e par an
              </strong>
              . Objectif 2050 : 2 tonnes !
            </Trans>
          ),
          highlight: <Trans locale={locale}>Et la vôtre ?</Trans>,
        },
        {
          illustration: '/images/icons/icone-avion.svg',
          content: (
            <Trans locale={locale}>
              Un aller-retour Paris-Athènes en avion représente{' '}
              <strong className="text-primary-600">800 kg de CO2e</strong>.
            </Trans>
          ),
          highlight: <Trans locale={locale}>Impressionnant, non ?</Trans>,
        },
      ]}
    />
  )
}
