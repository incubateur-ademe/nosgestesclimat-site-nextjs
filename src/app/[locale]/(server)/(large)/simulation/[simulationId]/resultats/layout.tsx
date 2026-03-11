import FinTabs from '@/components/results/FinTabs'

export default function Layout({
  children,
  params,
}: LayoutProps<'/[locale]/simulation/[simulationId]/resultats'>) {
  return (
    <>
      <FinTabs params={params} />

      {children}
    </>
  )
}
