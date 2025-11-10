'use client'

import QueryClientProviderWrapper from '@/app/[locale]/_components/mainLayoutProviders/QueryClientProviderWrapper'
import ActionAutoSave from '@/components/results/actions/ActionAutoSave'
import ActionsContent from '@/components/results/actions/ActionsContent'
import ActionsTutorial from '@/components/results/actions/ActionsTutorial'
import JagisActionBanner from '@/components/results/actions/JagisActionBanner'
import TopBar from '@/components/simulation/TopBar'
import { useRules } from '@/hooks/useRules'
import { EngineProvider, FormProvider } from '@/publicodes-state'

function ActionsContentInner() {
  return (
    <>
      <ActionAutoSave />
      <TopBar className="mb-6" simulationMode={false} showTotal />
      <ActionsTutorial />
      <JagisActionBanner />
      <ActionsContent />
    </>
  )
}

export default function ActionsTabContent() {
  const { data: rules } = useRules({ isOptim: true })

  if (!rules) {
    return null
  }

  return (
    <div className="flex flex-col">
      <h1 className="sr-only mb-6 text-2xl font-bold">Mes actions</h1>

      <QueryClientProviderWrapper>
        <EngineProvider rules={rules}>
          <FormProvider>
            <ActionsContentInner />
          </FormProvider>
        </EngineProvider>
      </QueryClientProviderWrapper>
    </div>
  )
}
