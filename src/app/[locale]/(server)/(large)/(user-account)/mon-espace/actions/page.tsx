import QueryClientProviderWrapper from '@/app/[locale]/_components/mainLayoutProviders/QueryClientProviderWrapper'
import NoResultsBlock from '@/components/dashboard/NoResultsBlock'
import ActionAutoSave from '@/components/results/actions/ActionAutoSave'
import ActionsContent from '@/components/results/actions/ActionsContent'
import ActionsTutorial from '@/components/results/actions/ActionsTutorial'
import JagisActionBanner from '@/components/results/actions/JagisActionBanner'
import TopBar from '@/components/simulation/TopBar'
import Trans from '@/components/translation/trans/TransServer'
import { MON_ESPACE_ACTIONS_PATH } from '@/constants/urls/paths'
import { getRules } from '@/helpers/modelFetching/getRules'
import { getUserSimulations } from '@/helpers/server/model/simulations'
import { getAuthUser } from '@/helpers/server/model/user'
import { EngineProvider, FormProvider, UserProvider } from '@/publicodes-state'
import type { DefaultPageProps } from '@/types'
import ProfileTab from '../_components/ProfileTabs'

export default async function MonEspaceActionsPage({
  params,
}: DefaultPageProps) {
  const { locale } = await params
  const rules = await getRules({ locale })
  const user = await getAuthUser()

  const simulations = await getUserSimulations({
    userId: user.id,
  })

  return (
    <div className="flex flex-col">
      <h1 className="sr-only mb-6 text-2xl font-bold">
        <Trans i18nKey="mon-espace.actions.title" locale={locale}>
          Mes actions
        </Trans>
      </h1>

      <ProfileTab locale={locale} activePath={MON_ESPACE_ACTIONS_PATH} />

      {!simulations || simulations.length <= 0 ? (
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

                <JagisActionBanner />
              </FormProvider>
            </EngineProvider>
          </QueryClientProviderWrapper>
        </UserProvider>
      )}
    </div>
  )
}
