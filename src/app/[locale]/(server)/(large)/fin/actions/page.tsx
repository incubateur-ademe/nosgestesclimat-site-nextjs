import QueryClientProviderWrapper from '@/app/[locale]/_components/mainLayoutProviders/QueryClientProviderWrapper'
import NoResultsBlock from '@/components/dashboard/NoResultsBlock'
import ActionAutoSave from '@/components/results/actions/ActionAutoSave'
import ActionsContent from '@/components/results/actions/ActionsContent'
import ActionsTutorial from '@/components/results/actions/ActionsTutorial'
import TopBar from '@/components/simulation/TopBar'
import { getRules } from '@/helpers/modelFetching/getRules'
import { getUser } from '@/helpers/server/dal/user'
import { getSimulations } from '@/helpers/server/model/simulations'
import { EngineProvider, FormProvider, UserProvider } from '@/publicodes-state'
import type { DefaultPageProps } from '@/types'

export default async function ResultatsActionsPage({
  params,
}: DefaultPageProps) {
  const { locale } = await params
  const user = await getUser()
  const simulations = await getSimulations({ user })
  const rules = await getRules({ locale })

  return (
    <div className="mb-20 flex flex-col">
      {simulations.length <= 0 ? (
        <NoResultsBlock locale={locale} />
      ) : (
        <UserProvider serverSimulations={simulations} initialUserId={user.id}>
          <QueryClientProviderWrapper>
            <EngineProvider rules={rules}>
              <FormProvider>
                <ActionAutoSave />

                <TopBar className="mb-6" simulationMode={false} showTotal />

                <ActionsTutorial />

                <ActionsContent />
              </FormProvider>
            </EngineProvider>
          </QueryClientProviderWrapper>
        </UserProvider>
      )}
    </div>
  )
}
