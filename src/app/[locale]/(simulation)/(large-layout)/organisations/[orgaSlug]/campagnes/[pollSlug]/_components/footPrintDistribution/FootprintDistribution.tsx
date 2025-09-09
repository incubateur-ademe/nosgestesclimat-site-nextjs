import Trans from '@/components/translation/trans/TransClient'
import MeanFootprintDistribution from './_components/MeanFootprintDistribution'

export default function FootprintDistribution() {
  return (
    <section>
      <h2>
        <Trans i18nKey="pollResults.distribution.title">
          Répartition des empreintes carbone
        </Trans>
      </h2>

      <MeanFootprintDistribution
        organisationName="Toto corp"
        groupFootprint={10.2}
        userFootprint={8.2}
      />
    </section>
  )
}
