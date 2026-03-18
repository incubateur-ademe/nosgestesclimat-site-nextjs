'use server'
import { EMAIL_PAGE_PATH, END_PAGE_PATH } from '@/constants/urls/paths'
import { getUser } from '@/helpers/server/dal/user'
import { getLocaleFromHeaders } from '@/helpers/server/getLocaleForNotFoundOrUnautorizedPage'
import { postSimulation } from '@/helpers/simulation/postSimulation'
import type { Simulation } from '@/publicodes-state/types'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function endTestAction(simulation: Simulation) {
  revalidatePath('/fin')
  const locale = await getLocaleFromHeaders()
  const user = await getUser()
  await postSimulation({ simulation, userId: user.id, locale })
  if (simulation.polls?.length || simulation.groups?.length) {
    redirect(EMAIL_PAGE_PATH)
  }
  redirect(END_PAGE_PATH)
}
