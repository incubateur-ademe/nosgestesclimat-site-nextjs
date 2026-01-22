'use client'

import QueryClientProviderWrapper from '@/app/[locale]/_components/mainLayoutProviders/QueryClientProviderWrapper'
import ActionAutoSave from '@/components/results/actions/ActionAutoSave'
import ActionsContent from '@/components/results/actions/ActionsContent'
import ActionsTutorial from '@/components/results/actions/ActionsTutorial'
import JagisActionBanner from '@/components/results/actions/JagisActionBanner'
import TopBar from '@/components/simulation/TopBar'
import BlockSkeleton from '@/design-system/layout/BlockSkeleton'
import { useRules } from '@/hooks/useRules'
import { EngineProvider, FormProvider, UserProvider } from '@/publicodes-state'
import useUser from '@/publicodes-state/hooks/useUser/useUser'

function ActionsContentInner() {
  const { isInitialized } = useUser()
  const { data: rules } = useRules({ isOptim: true })

  if (!isInitialized || !rules) return <BlockSkeleton />

  return (
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
  )
}

export default function ActionsTabContent() {
  return (
    <div className="flex flex-col">
      <h1 className="sr-only mb-6 text-2xl font-bold">Mes actions</h1>
      <UserProvider>
        <ActionsContentInner />
      </UserProvider>
    </div>
  )
}
