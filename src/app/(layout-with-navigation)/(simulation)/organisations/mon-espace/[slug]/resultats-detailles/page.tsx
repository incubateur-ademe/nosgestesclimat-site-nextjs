import OrgaStatistics from '@/components/organizations/OrgaStatistics'
import Trans from '@/components/translation/Trans'
import Button from '@/design-system/inputs/Button'
import OrgaStatisticsCharts from './_components/OrgaStatisticsCharts'
import OrgaStatisticsFilters from './_components/OrgaStatisticsFilters'

export default function ResultatsDetaillesPage() {
  return (
    <div className="pt-12">
      <div className="mb-10 flex flex-wrap items-center justify-between md:flex-nowrap">
        <h1>
          <Trans>Résultats détaillés</Trans>
        </h1>

        <Button color="secondary">
          <Trans>Exporter les données</Trans>
        </Button>
      </div>

      <OrgaStatisticsFilters />

      <OrgaStatistics title={<Trans>Chiffres clés</Trans>} />

      <OrgaStatisticsCharts />
    </div>
  )
}
