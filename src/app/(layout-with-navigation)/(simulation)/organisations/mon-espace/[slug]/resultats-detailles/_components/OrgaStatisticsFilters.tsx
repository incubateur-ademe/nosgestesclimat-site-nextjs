import Trans from '@/components/translation/Trans'
import AgeFilter from './orgaStatisticsFilters/AgeFilter'
import DepartementFilter from './orgaStatisticsFilters/DepartementFilter'

export default function OrgaStatisticsFilters() {
  return (
    <div className="flex items-center justify-between rounded-lg bg-grey-100 px-6 py-4">
      <div>
        <p className="mb-0">
          <Trans>Filtrer par</Trans>
        </p>
      </div>

      <div className="flex gap-8">
        <AgeFilter />

        <DepartementFilter />
      </div>
    </div>
  )
}
