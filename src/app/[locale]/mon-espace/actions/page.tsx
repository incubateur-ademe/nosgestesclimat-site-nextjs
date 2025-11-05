import ContentLarge from '@/components/layout/ContentLarge'
import TopBar from '@/components/simulation/TopBar'
import Trans from '@/components/translation/trans/TransServer'
import { STORAGE_KEY } from '@/constants/storage'
import { CONNEXION_PATH, MON_ESPACE_ACTIONS_PATH } from '@/constants/urls/paths'
import { getIsUserAuthenticated } from '@/helpers/authentication/getIsUserAuthenticated'
import { getRules } from '@/helpers/modelFetching/getRules'
import { fetchUserSimulations } from '@/helpers/user/fetchUserSimulations'
import { EngineProvider, FormProvider, UserProvider } from '@/publicodes-state'
import type { DefaultPageProps } from '@/types'
import migrationInstructions from '@incubateur-ademe/nosgestesclimat/public/migration.json'
import { redirect } from 'next/navigation'
import ActionsContent from '../../(simulation)/(large-layout)/actions/_components/ActionsContent'
import ActionsTutorial from '../../(simulation)/(large-layout)/actions/_components/ActionsTutorial'
import QueryClientProviderWrapper from '../../_components/mainLayoutProviders/QueryClientProviderWrapper'
import ProfileTab from '../_components/ProfileTabs'
import ActionAutoSave from './_components/ActionAutoSave'
import JagisActionBanner from './_components/JagisActionBanner'

export default async function MonEspaceActionsPage({
  params,
}: DefaultPageProps) {
  const { locale } = await params

  const rules = await getRules()

  const authenticatedUser = await getIsUserAuthenticated()

  const simulations = await fetchUserSimulations({
    userId: authenticatedUser?.id,
  })

  const sortedSimulations = simulations.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  const latestSimulation = sortedSimulations[0]

  if (!authenticatedUser) {
    redirect(CONNEXION_PATH)
  }

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
          storageKey={STORAGE_KEY}
          migrationInstructions={migrationInstructions}
          initialSimulations={sortedSimulations}
          initialCurrentSimulationId={latestSimulation?.id}
          initialUserId={authenticatedUser.id}>
          <QueryClientProviderWrapper>
            <EngineProvider rules={rules}>
              <FormProvider>
                <ActionAutoSave />

                <TopBar className="mb-6" simulationMode={false} showTotal />

                <ActionsTutorial />

                <JagisActionBanner />

                <ActionsContent />
              </FormProvider>
            </EngineProvider>
          </QueryClientProviderWrapper>
        </UserProvider>
      </div>
    </ContentLarge>
  )
}
