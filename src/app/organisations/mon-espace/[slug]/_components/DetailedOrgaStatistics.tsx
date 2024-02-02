import Trans from '@/components/translation/Trans'
import Separator from '@/design-system/layout/Separator'
import RepartitionChart from './detailedOrgaStatistics/RepartitionChart'

export default function DetailedOrgaStatistics(/*{
  pollData,
}: {
  pollData: PollData
}*/) {
  // Generate mock data for pollData
  const mockPollData = {
    simulationsRecap: [
      {
        bilan: 5,
      },
      {
        bilan: 10,
      },
      {
        bilan: 15,
      },
      {
        bilan: 20,
      },
      {
        bilan: 25,
      },
    ],
  }

  return (
    <section>
      <h2>
        <Trans>Résultats du groupe</Trans>
      </h2>

      <p>
        Chaque participation est représentée par une barre verticale. Votre
        score est affiché en rose.
      </p>

      <Separator />

      <h3>
        <Trans>Empreinte carbone</Trans>
      </h3>
      <RepartitionChart
        items={mockPollData.simulationsRecap.map(({ bilan }) => ({
          value: bilan,
          shouldBeHighlighted: false,
        }))}
      />
    </section>
  )
}
