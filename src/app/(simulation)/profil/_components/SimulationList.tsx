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
    <div className="mt-8">
      <h2 className="text-lg">
        <span
          role="img"
          aria-label="emoji save"
          aria-hidden
          className="inline-block mr-4">
          💾
        </span>
        <TransClient>Mon historique des simulations</TransClient>
      </h2>
      <p>
        <TransClient i18nKey={'publicodes.Profil.simulations'}>
          Chaque simulation que vous faite est sauvegardée dans votre navigateur
          Web. Vous êtes le seul à y avoir accès.
        </TransClient>
      </p>
      <ul>
        {simulations.map((simulation: Simulation) => {
          const simulationDate =
            simulation.date !== undefined
              ? new Date(simulation.date)
              : new Date()

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
    </div>
  )
}
