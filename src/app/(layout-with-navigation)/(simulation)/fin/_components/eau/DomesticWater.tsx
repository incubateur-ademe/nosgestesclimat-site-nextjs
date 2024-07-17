import VigieEau from '@/components/fin/waterTotalChart/waveContent/VigieEau'
import Link from '@/components/Link'
import Trans from '@/components/translation/Trans'
import Title from '@/design-system/layout/Title'
import { formatFootprint } from '@/helpers/formatters/formatFootprint'
import { useRule } from '@/publicodes-state'

export default function DomesticWater() {
  const { numericValue } = useRule('logement . eau directe . par jour', 'eau')

  const { formattedValue, unit } = formatFootprint(numericValue, {
    metric: 'eau',
  })
  return (
    <div>
      <Title tag="h2">
        <Trans>
          Qu’est-ce que{' '}
          <strong className="text-secondary-700">l’eau domestique ?</strong>
        </Trans>
      </Title>
      <p>
        <Trans>
          L’eau domestique sort de vos robinets. C’est celle que vous payez au
          travers de votre facture d’eau.
        </Trans>
      </p>
      <p>
        {formattedValue} <Trans>{unit}</Trans>
      </p>
      <p>
        <Trans>
          Elle représente une petite partie de votre empreinte eau mais elle
          peut avoir un{' '}
          <strong className="font-black text-secondary-700">
            très fort impact localisé
          </strong>{' '}
          selon la{' '}
          <strong className="font-black text-secondary-700">saison</strong>.
        </Trans>
      </p>
      <p>
        <Trans>
          Voici la carte des départements qui subissent (ou sont proche de
          subir) des restrictions d'eau aujourd'hui.
        </Trans>
      </p>
      <div className="mx-auto mb-4 max-w-96">
        <VigieEau />
      </div>
      <p>
        <Link href="https://vigieau.gouv.fr/">
          <Trans>Rendez-vous sur Vigie Eau pour en savoir plus.</Trans>
        </Link>
      </p>
    </div>
  )
}
