import Link from '@/components/Link'
import Trans from '@/components/translation/Trans'
import { useVigieEau } from '@/hooks/useVigieEau'
// @ts-expect-error There is no types for this package
import France from '@socialgouv/react-departements'
import DomesticWaterChart from './domesticWaterContent/DomesticWaterChart'

export default function DomesticWaterContent() {
  const { departements, error } = useVigieEau()

  // We remove the departements with the maximum level of vigilance (there is no restriction yet)
  const departementsCodes = departements
    .filter((departement) => departement.niveauGraviteMax !== 'vigilance')
    .map((departement) => departement.code)

  return (
    <>
      <p className="mb-6">
        <Trans>
          L’eau domestique, à savoir, celle qui sort de vos robinets n'est pas
          comprise dans votre empreinte eau, puisqu’elle est restituée. Par
          exemple, l’eau de votre douche, après dépollution, est rendue aux
          cours d’eau de votre territoire.
        </Trans>
      </p>
      <DomesticWaterChart />
      <p>
        <Trans>
          L’eau domestique peut avoir un{' '}
          <strong className="font-black text-secondary-700">
            impact très fort
          </strong>{' '}
          selon la{' '}
          <strong className="font-black text-secondary-700">
            saison et la localisation.
          </strong>
        </Trans>
      </p>
      <p>
        <Trans>
          Voici la carte des départements qui subissent des restrictions d'eau
          en ce moment :
        </Trans>
      </p>
      <div className="relative mb-8 max-w-96 self-center">
        <France
          departements={departementsCodes}
          color="transparent"
          highlightColor="#d40d83"
        />

        {error && (
          <div className="absolute left-0 top-0 z-10 flex h-full w-full flex-col items-center justify-center bg-[rgba(255,255,255,0.7)]">
            <p className="text-center text-sm font-bold text-red-700">
              <Trans>
                Oups ! Une erreur s'est produite au moment de récupérer les
                données VigiEau.
              </Trans>
            </p>
            <p className="text-center text-sm font-bold text-red-700">
              <Trans>
                Veuillez réessayer plus tard ou nous contacter si le problème
                persiste.
              </Trans>
            </p>
          </div>
        )}
      </div>

      <p>
        <Link href="https://vigieau.gouv.fr/" target="_blank">
          <Trans>Rendez-vous sur VigiEau pour en savoir plus.</Trans>
        </Link>
      </p>
    </>
  )
}
