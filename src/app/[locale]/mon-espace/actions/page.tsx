import NoResultsBlock from '@/components/dashboard/NoResultsBlock'
import ContentLarge from '@/components/layout/ContentLarge'
import ActionAutoSave from '@/components/results/actions/ActionAutoSave'
import TopBar from '@/components/simulation/TopBar'
import Trans from '@/components/translation/trans/TransServer'
import { MON_ESPACE_ACTIONS_PATH } from '@/constants/urls/paths'
import { getRules } from '@/helpers/modelFetching/getRules'
import { getUser } from '@/helpers/server/model/user'
import { fetchUserSimulations } from '@/helpers/user/fetchUserSimulations'
import { EngineProvider, FormProvider, UserProvider } from '@/publicodes-state'
import type { DefaultPageProps } from '@/types'
import ActionsContent from '../../../../components/results/actions/ActionsContent'
import ActionsTutorial from '../../../../components/results/actions/ActionsTutorial'
import JagisActionBanner from '../../../../components/results/actions/JagisActionBanner'
import QueryClientProviderWrapper from '../../_components/mainLayoutProviders/QueryClientProviderWrapper'
import ProfileTab from '../_components/ProfileTabs'

export default async function MonEspaceActionsPage({
  params,
}: DefaultPageProps) {
  const { locale } = await params
  const rules = await getRules()
  const user = await getUser()

  const simulations = await fetchUserSimulations({
    userId: user.id,
  })

  const latestSimulation = simulations?.[0]

  return (
    <ContentLarge className="mt-4 px-4 md:mt-10 lg:px-0">
      <div className="flex flex-col">
        <h1 className="sr-only mb-6 text-2xl font-bold">
          <Trans i18nKey="mon-espace.actions.title" locale={locale}>
            Mes actions
          </Trans>
        </h1>

        <ProfileTab activePath={MON_ESPACE_ACTIONS_PATH} />

        <UserProvider
          initialSimulations={simulations}
          initialCurrentSimulationId={latestSimulation?.id}
          initialUserId={user.id}>
          {simulations && simulations?.length <= 0 ? (
            <NoResultsBlock locale={locale} />
          ) : (
            <QueryClientProviderWrapper>
              <EngineProvider rules={rules}>
                <FormProvider>
                  <ActionAutoSave />

                  <TopBar className="mb-6" simulationMode={false} showTotal />

                  <ActionsTutorial />

                  <ActionsContent />

                  <JagisActionBanner />
                </FormProvider>
              </EngineProvider>
            </QueryClientProviderWrapper>
          )}
        </UserProvider>
      </div>
    </ContentLarge>
  )
}
