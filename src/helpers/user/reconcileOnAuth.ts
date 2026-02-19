import { TEST_INTRO_TUTO_KEY } from '@/app/[locale]/(simulation)/(large)/tutoriel/_components/ButtonStart'
import type { CookieState } from '@/components/cookies/cookieLocalStorage'
import { saveSimulation } from '@/helpers/simulation/saveSimulation'
import type { useUser } from '@/publicodes-state'
import type { Simulation } from '@/publicodes-state/types'
import posthog from 'posthog-js'
import { getUserSimulations } from '../server/model/simulations'
import { generateSimulation } from '../simulation/generateSimulation'

// This is the date when we started to save all simulations started on the server
const LIMIT_DATE = new Date('2025-11-27')

async function uploadLocalSimulations({
  simulations,
  userId,
}: {
  simulations: Simulation[]
  userId: string
}) {
  // Save all simulation started before the LIMIT_DATE
  const simulationsToSave = simulations.filter(
    (simulation) => new Date(simulation.date) < LIMIT_DATE
  )

  await Promise.allSettled(
    simulationsToSave.map((simulation) =>
      saveSimulation({
        simulation,
        userId,
      })
    )
  )
}

async function loadServerSimulation({
  userId,
  updateSimulations,
  setCurrentSimulationId,
  hideTutorial,
}: {
  userId: string
  updateSimulations: (simulations: Simulation[]) => void
  setCurrentSimulationId: (simulationId: string) => void
  hideTutorial: (tutorialId: string) => void
}) {
  // Fetch simulations from server
  let simulations = await getUserSimulations({
    userId,
  })

  if (simulations.length === 0) {
    simulations = [generateSimulation()]
  } else {
    hideTutorial(TEST_INTRO_TUTO_KEY)
  }
  updateSimulations(simulations)
  setCurrentSimulationId(simulations[0].id)
}

export async function reconcileUserOnAuth({
  userId,
  email,
  user,
  cookieState,
}: {
  userId: string
  email: string
  user: ReturnType<typeof useUser>
  cookieState: CookieState
}) {
  const {
    user: localUser,
    updateSimulations,
    simulations,
    updateEmail,
    updateUserId,
    setCurrentSimulationId,
    hideTutorial,
  } = user

  if (userId === localUser.userId) {
    // We only sync if localuserId is the same as distant userId
    await uploadLocalSimulations({
      simulations,
      userId,
    })
  }

  await loadServerSimulation({
    userId,
    updateSimulations,
    setCurrentSimulationId,
    hideTutorial,
  })

  updateEmail(email)
  updateUserId(userId)

  // We identify the user to posthog after the reconciliation

  if (cookieState.posthog === 'accepted') {
    posthog.identify(userId)
  }
}
