import { ActionPage } from '@/components/results/ActionPage'
import { getRules } from '@/helpers/modelFetching/getRules'
import { getUser } from '@/helpers/server/dal/user'
import { getSimulations } from '@/helpers/server/model/simulations'
import type { DefaultPageProps } from '@/types'

export default async function ResultatsActionsPage({
  params,
}: DefaultPageProps) {
  const { locale } = await params
  const user = await getUser()
  const simulations = await getSimulations(
    { user },
    { completedOnly: true, pageSize: 1 }
  )
  const rules = await getRules({ locale })

  return <ActionPage simulations={simulations} rules={rules} locale={locale} />
}
