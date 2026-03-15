import QueryClientProviderWrapper from '@/app/[locale]/_components/mainLayoutProviders/QueryClientProviderWrapper'
import type { AppUser } from '@/helpers/server/dal/user'
import type { Locale } from '@/i18nConfig'
import { EngineProvider, FormProvider, UserProvider } from '@/publicodes-state'
import type { Simulation } from '@/publicodes-state/types'
import type { NGCRules } from '@incubateur-ademe/nosgestesclimat'
import NoResultsBlock from '../dashboard/NoResultsBlock'
import TopBar from '../simulation/TopBar'
import ActionAutoSave from './actions/ActionAutoSave'
import ActionsContent from './actions/ActionsContent'
import ActionsTutorial from './actions/ActionsTutorial'

interface Props {
  simulations: Simulation[]
  user: AppUser
  rules: Partial<NGCRules>
  locale: Locale
}
export function ActionPage({ simulations, user, rules, locale }: Props) {
  return (
    <div className="mb-20 flex flex-col">
      {simulations.length <= 0 ? (
        <NoResultsBlock locale={locale} />
      ) : (
        <UserProvider serverSimulations={simulations} serverUserId={user.id}>
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
