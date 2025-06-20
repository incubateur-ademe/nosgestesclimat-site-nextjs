import DidYouKnowSlider from '@/components/landing-pages/DidYouKnowSlider'
import Trans from '@/components/translation/trans/TransServer'

export default function DidYouKnowMainLanding({
  locale,
  className,
  titleTag = 'h2',
}: {
  locale: string
  className?: string
  titleTag?: 'h2' | 'h3'
}) {
  return (
    <DidYouKnowSlider
      className={className}
      titleTag={titleTag}
      slides={[
        {
          illustration:
            'https://nosgestesclimat-prod.s3.fr-par.scw.cloud/cms/icone_ordinateur_2f234e6e03.svg',
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
          illustration:
            'https://nosgestesclimat-prod.s3.fr-par.scw.cloud/cms/icone_jeans_6bb7c35001.svg',
          content: (
            <Trans locale={locale}>
              La production d'un jean nécessite près de{' '}
              <strong className="text-primary-600">30 000 litres d'eau</strong>.
            </Trans>
          ),
          highlight: <Trans locale={locale}>Considérable, non ?</Trans>,
        },
        {
          illustration:
            'https://nosgestesclimat-prod.s3.fr-par.scw.cloud/cms/icone_goutte_eau_00c6538519.svg',
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
          illustration:
            'https://nosgestesclimat-prod.s3.fr-par.scw.cloud/cms/icone_avion_ed60633339.svg',
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
