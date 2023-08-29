import TransClient from '@/components/translation/TransClient'
import Button from '@/design-system/inputs/Button'
import { useUser } from '@/publicodes-state'
import { Simulation } from '@/types/simulation'
import { Trans } from 'react-i18next'

export default function SimulationList() {
  const {
    simulations,
    currentSimulation: currentSimulationId,
    setCurrentSimulation,
    deleteSimulation,
  } = useUser()

  return (
    <ul>
      {simulations.map((simulation: Simulation) => {
        const simulationDate =
          simulation.date !== undefined ? new Date(simulation.date) : new Date()

        return (
          <li key={simulation.id} className="list-none">
            <details>
              <summary>
                <div className="inline-flex">
                  <span>{simulationDate.toLocaleDateString()}</span>
                  <span className="ml-1 w-[8rem] overflow-hidden whitespace-nowrap overflow-ellipsis hidden md:inline-block">
                    - {simulation.id}
                  </span>
                  {currentSimulationId === simulation.id ? (
                    <span className="mx-2">
                      ✅ <Trans>Chargée</Trans>
                    </span>
                  ) : (
                    <span>
                      <Button
                        className="mx-2"
                        size="sm"
                        onClick={() => {
                          /*
                          dispatch(setCurrentSimulation(simulation))
                          dispatch(setActionsChoices(simulation.actionChoices))
                          dispatch(
                            setAllStoredTrajets(simulation.storedTrajets)
                          )
                          */
                          setCurrentSimulation(simulation.id)
                        }}>
                        <TransClient>Charger</TransClient>
                      </Button>
                      <Button
                        className="mx-2"
                        size="sm"
                        onClick={() => {
                          deleteSimulation(simulation.id)
                        }}>
                        <TransClient>Supprimer</TransClient>
                      </Button>
                    </span>
                  )}
                </div>
              </summary>
              <ul>
                <li>
                  <TransClient>Date complète :</TransClient>
                  {simulationDate.toLocaleDateString()}{' '}
                  {simulationDate.toLocaleTimeString()}.
                </li>
                <li>
                  <TransClient>Identifiant :</TransClient> {simulation.id}.
                </li>
              </ul>
            </details>
          </li>
        )
      })}
    </ul>
  )
}
