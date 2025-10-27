import MetricSlider from '@/components/fin/MetricSlider'
import BlockSkeleton from '@/design-system/layout/BlockSkeleton'
import { useRules } from '@/hooks/useRules'
import { EngineProvider } from '@/publicodes-state'

export default function ResultsBanner() {
  const { data: rules, isLoading } = useRules({ isOptim: false })

  if (isLoading) {
    return <BlockSkeleton />
  }

  return (
    <EngineProvider rules={rules}>
      <MetricSlider isStatic isSharePage className="mb-0 h-auto" />
    </EngineProvider>
  )
}
