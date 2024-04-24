'use client'

import CheckCircleIcon from '@/components/icons/CheckCircleIcon'
import SavesIcon from '@/components/icons/SavesIcon'
import Trans from '@/components/translation/Trans'
import {
  profilDeleteSimulation,
  profilLoadSimulation,
} from '@/constants/tracking/pages/profil'
import Button from '@/design-system/inputs/Button'
import { useUser } from '@/publicodes-state'
import { Simulation } from '@/publicodes-state/types'
import { trackEvent } from '@/utils/matomo/trackEvent'

export default function SimulationList() {
  const {
    simulations,
    currentSimulationId,
    setCurrentSimulationId,
    deleteSimulation,
  } = useUser()

  return (
    <div className="my-6">
      <h2 className="flex items-center">
        <SavesIcon className="mr-3 fill-primary-700" />

        <Trans>Mon historique des simulations</Trans>
      </h2>
      <p>
        <Trans i18nKey={'publicodes.Profil.simulations'}>
          Chaque simulation que vous faite est sauvegardée dans votre navigateur
          Web. Vous êtes le seul à y avoir accès.
        </Trans>
      </p>
      <ul>
        {simulations.map((simulation: Simulation) => {
          const simulationDate =
            simulation.date !== undefined
              ? new Date(simulation.date)
              : new Date()

          return (
            <li key={simulation.id} className="mb-2 list-none">
              <details>
                <summary>
                  <div className="inline-flex">
                    <span>{simulationDate.toLocaleDateString()}</span>
                    <span className="ml-1 hidden w-[8rem] overflow-hidden overflow-ellipsis whitespace-nowrap md:inline-block">
                      - {simulation.id}
                    </span>
                    {currentSimulationId === simulation.id ? (
                      <span className="mx-2 flex items-center">
                        <CheckCircleIcon className="mr-1 h-4 w-4 fill-green-500" />{' '}
                        <Trans>Chargée</Trans>
                      </span>
                    ) : (
                      <span>
                        <Button
                          className="mx-2"
                          size="xs"
                          onClick={() => {
                            trackEvent(profilLoadSimulation)
                            setCurrentSimulationId(simulation.id as string)
                          }}>
                          <Trans>Charger</Trans>
                        </Button>

                        <Button
                          className="mx-2"
                          size="xs"
                          onClick={() => {
                            trackEvent(profilDeleteSimulation)
                            deleteSimulation(simulation.id as string)
                          }}>
                          <Trans>Supprimer</Trans>
                        </Button>
                      </span>
                    )}
                  </div>
                </summary>
                <ul>
                  <li>
                    <Trans>Date complète :</Trans>
                    {simulationDate.toLocaleDateString()}{' '}
                    {simulationDate.toLocaleTimeString()}.
                  </li>
                  <li>
                    <Trans>Identifiant :</Trans> {simulation.id}.
                  </li>
                </ul>
              </details>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
