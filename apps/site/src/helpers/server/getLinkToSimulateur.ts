import {
  END_PAGE_PATH,
  MON_ESPACE_PATH,
  SIMULATOR_PATH,
  TUTORIAL_PATH,
} from '@/constants/urls/paths'
import type { Simulation } from '@/helpers/server/model/simulations'
import type { UserSession } from '@/services/auth/get-user-session'
import type { TFunction } from 'i18next'
export function getMainCTA({
  currentSimulation,
  completedSimulations,
  user,
  t,
}: {
  currentSimulation?: Simulation
  user: UserSession
  completedSimulations: Simulation[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: TFunction<any, string>
}) {
  if (!currentSimulation) {
    return {
      children: t('Commencer le test'),
      // First-time visitors land on the tutorial, which creates their
      // session + simulation (via the "C'est parti !" form action) before
      // sending them to the simulator.
      href: TUTORIAL_PATH,
    }
  }

  if (currentSimulation.progression === 0) {
    return {
      children: t('Commencer le test'),
      href: completedSimulations.length ? SIMULATOR_PATH : TUTORIAL_PATH,
    }
  }
  if (currentSimulation.progression === 1) {
    return {
      children: t('Voir mes résultats'),
      href: user?.isAuth ? MON_ESPACE_PATH : END_PAGE_PATH,
    }
  }

  // If the user has seen the tutoriel we return the test page label
  return {
    children: t('Reprendre mon test'),
    href: SIMULATOR_PATH,
  }
}
