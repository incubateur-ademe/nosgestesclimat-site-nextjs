import Link from '@/components/Link'
import Trans from '@/components/translation/Trans'
import Title from '@/design-system/layout/Title'
import { formatFootprint } from '@/helpers/formatters/formatFootprint'
import { useRule } from '@/publicodes-state'
import VigieEau from './domesticWater/VigieEau'

export default function DomesticWater() {
  const { numericValue } = useRule('logement . eau directe', 'eau')

  const { formattedValue, unit } = formatFootprint(numericValue, {
    metric: 'eau',
  })
  return (
    <div className="flex flex-col items-start">
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
      <div className="mb-4 flex gap-4 rounded-xl border-2 border-primary-50 bg-gray-100 p-4 lg:pr-8">
        <svg
          className="h-auto fill-water lg:w-14"
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M37.7916 23.6907L24.197 1.45337L11.5996 23.5387C8.66632 28.2187 8.41032 34.304 11.4916 39.344C15.8716 46.508 25.309 48.808 32.573 44.4867C39.8343 40.1667 42.1716 30.86 37.7916 23.6907Z" />
        </svg>
        <p className="mb-0 lg:text-xl">
          <Trans>Vous consommez</Trans> <br className="hidden lg:inline" />
          <strong className="font-black text-water">
            {formattedValue} <Trans>{unit}</Trans>
          </strong>{' '}
          <Trans>d’eau domestique par jour</Trans>
        </p>
      </div>

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
          subir) des restrictions d'eau aujourd'hui :
        </Trans>
      </p>
      <div className="mx-auto mb-8 max-w-96">
        <VigieEau />
      </div>
      <p>
        <Link href="https://vigieau.gouv.fr/" target="_blank">
          <Trans>Rendez-vous sur VigiEau pour en savoir plus.</Trans>
        </Link>
      </p>
    </div>
  )
}
