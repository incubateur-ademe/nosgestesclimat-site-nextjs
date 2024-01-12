import Trans from '@/components/translation/Trans'
import Title from '@/design-system/layout/Title'
import { Organization } from '@/types/organizations'
import ResultsSoonBanner from './orgaStatistics/ResultsSoonBanner'
import StatisticsBlocks from './orgaStatistics/StatisticsBlocks'

export default function OrgaStatistics({
  organization,
}: {
  organization: Organization
}) {
  return (
    <>
      <Title tag="h2" title={<Trans>Statistiques</Trans>} />

      <section className="relative flex gap-4">
        <StatisticsBlocks simulations={organization?.polls?.[0]?.simulations} />

        {organization?.polls?.[0]?.simulations?.length <= 0 && (
          <ResultsSoonBanner />
        )}
      </section>
    </>
  )
}
