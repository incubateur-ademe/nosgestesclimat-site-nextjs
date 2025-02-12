'use client'

import Link from '@/components/Link'
import TransClient from '@/components/translation/trans/TransClient'
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
        <TransClient>
          L’eau domestique, à savoir, celle qui sort de vos robinets n'est pas
          comprise dans votre empreinte eau, puisqu’elle est restituée. Par
          exemple, l’eau de votre douche, après dépollution, est rendue aux
          cours d’eau de votre territoire.
        </TransClient>
      </p>
      <DomesticWaterChart />
      <p>
        <TransClient>
          L’eau domestique peut avoir un{' '}
          <strong className="text-secondary-700 font-black">
            impact très fort
          </strong>{' '}
          selon la{' '}
          <strong className="text-secondary-700 font-black">
            saison et la localisation.
          </strong>
        </TransClient>
      </p>
      <p>
        <TransClient>
          Voici la carte des départements qui subissent des restrictions d'eau
          en ce moment :
        </TransClient>
      </p>
      <div className="relative mb-8 max-w-96 self-center">
        <France
          departements={departementsCodes}
          color="transparent"
          highlightColor="#d40d83"
        />

        {error && (
          <div className="absolute top-0 left-0 z-10 flex h-full w-full flex-col items-center justify-center bg-[rgba(255,255,255,0.7)]">
            <p className="text-center text-sm font-bold text-red-700">
              <TransClient>
                Oups ! Une erreur s'est produite au moment de récupérer les
                données VigiEau.
              </TransClient>
            </p>
            <p className="text-center text-sm font-bold text-red-700">
              <TransClient>
                Veuillez réessayer plus tard ou nous contacter si le problème
                persiste.
              </TransClient>
            </p>
          </div>
        )}
      </div>

      <p>
        <Link href="https://vigieau.gouv.fr/" target="_blank">
          <TransClient>
            Rendez-vous sur VigiEau pour en savoir plus.
          </TransClient>
        </Link>
      </p>
    </>
  )
}
