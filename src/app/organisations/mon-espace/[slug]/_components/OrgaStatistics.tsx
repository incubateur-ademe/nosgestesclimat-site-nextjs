import Trans from '@/components/translation/Trans'
import Title from '@/design-system/layout/Title'
import ResultsSoonBanner from './orgaStatistics/ResultsSoonBanner'

export default function OrgaStatistics() {
  return (
    <>
      <Title tag="h2" title={<Trans>Statistiques</Trans>} />

      <section>
        <ResultsSoonBanner />
      </section>
    </>
  )
}
