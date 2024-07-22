import Link from '@/components/Link'
import Trans from '@/components/translation/Trans'
import { formatFootprint } from '@/helpers/formatters/formatFootprint'
import { useVigieEau } from '@/hooks/useVigieEau'
import { useRule } from '@/publicodes-state'
// @ts-expect-error There is no types for this package
import France from '@socialgouv/react-departements'

export default function DomesticWaterContent() {
  const { numericValue } = useRule('logement . eau domestique', 'eau')

  const { formattedValue, unit } = formatFootprint(numericValue, {
    metric: 'eau',
  })

  const { departements } = useVigieEau()

  const departementsCodes = departements.map((departement) => departement.code)

  return (
    <>
      <p className="mb-6">
        <Trans>
          L’eau domestique sort de vos robinets. C’est celle que vous payez au
          travers de votre facture d’eau.
        </Trans>
      </p>
      <div className="mb-6 self-center">
        <div className="flex gap-4 rounded-xl bg-water p-4 lg:pr-8">
          <svg
            className="h-auto fill-white lg:w-14"
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M37.7916 23.6907L24.197 1.45337L11.5996 23.5387C8.66632 28.2187 8.41032 34.304 11.4916 39.344C15.8716 46.508 25.309 48.808 32.573 44.4867C39.8343 40.1667 42.1716 30.86 37.7916 23.6907Z" />
          </svg>
          <p className="mb-0 text-white lg:text-xl">
            <Trans>Vous utilisez</Trans> <br className="hidden lg:inline" />
            <strong className="font-black">
              {formattedValue} <Trans>{unit}</Trans>
            </strong>{' '}
            <Trans>d’eau domestique par jour</Trans>
          </p>
        </div>
        <p className="mb-0 w-full text-center text-sm italic">
          *La moyenne française est de 145 litres par jour
        </p>
      </div>
      <p>
        <Trans>
          Contrairement à l'empreinte eau, l'eau domestique n'est pas consommée,
          mais seulement prélevée. Cela signifie qu'elle est dépolluée puis
          restituée au cycle de l'eau après utilisation. Néanmoins elle peut
          avoir un{' '}
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
          subir) des restrictions d'eau aujourd'hui :
        </Trans>
      </p>
      <div className="mb-8 max-w-96 self-center">
        <France
          departements={departementsCodes}
          color="transparent"
          highlightColor="#d40d83"
        />
      </div>
      <p>
        <Link href="https://vigieau.gouv.fr/" target="_blank">
          <Trans>Rendez-vous sur VigiEau pour en savoir plus.</Trans>
        </Link>
      </p>
    </>
  )
}
