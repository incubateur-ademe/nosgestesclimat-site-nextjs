import DidYouKnowSlider from '@/components/landing-pages/DidYouKnowSlider'
import Trans from '@/components/translation/Trans'

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
            <Trans locale={locale}>
              L'empreinte carbone moyenne d'un français est de{' '}
              <strong className="text-primary-600">
                9,1 tonnes de CO2e par an
              </strong>
              .
            </Trans>
          ),
          highlight: <Trans locale={locale}>Et la vôtre ?</Trans>,
        },
        {
          illustration: '/images/icons/icone-jeans.svg',
          content: (
            <Trans locale={locale}>
              La production d'un jean nécessite près de{' '}
              <strong className="text-primary-600">30 000 litres d'eau</strong>.
            </Trans>
          ),
          highlight: <Trans locale={locale}>Considérable, non ?</Trans>,
        },
        {
          illustration: '/images/icons/icone-goutte.svg',
          content: (
            <Trans locale={locale}>
              L'empreinte eau moyenne d'un français se compte{' '}
              <strong className="text-primary-600">
                milliers de litres par jour
              </strong>
              .
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
