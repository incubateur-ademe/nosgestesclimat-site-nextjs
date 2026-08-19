'use server'
import {
  EMAIL_PAGE_PATH,
  END_PAGE_PATH,
  GROUP_RESULTS_ROUTE_PATTERN,
} from '@/constants/urls/paths'
import { InternalError } from '@/helpers/server/error'
import { getLocaleFromHeaders } from '@/helpers/server/getLocaleForNotFoundOrUnautorizedPage'
import type { Simulation } from '@/helpers/server/model/simulations'
import { getUserSession } from '@/services/auth/get-user-session'
import { saveSimulation } from '@/services/simulations/save-simulation'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function endTestAction(simulation: Simulation, userName?: string) {
  revalidatePath(END_PAGE_PATH, 'layout')
  const locale = await getLocaleFromHeaders()
  const user = await getUserSession()
  if (simulation.progression !== 1) {
    throw new InternalError()
  }
  await saveSimulation({
    simulation,
    name: userName,
    locale,
  })

  // The simulator saves its progress without revalidating anything; the completed footprint is the
  // one the group results page must pick up.
  if (simulation.groups?.length) {
    revalidatePath(GROUP_RESULTS_ROUTE_PATTERN, 'page')
  }
  if (
    !user?.isAuth &&
    (simulation.polls?.length || simulation.groups?.length)
  ) {
    redirect(EMAIL_PAGE_PATH)
  }
  redirect(END_PAGE_PATH)
}
