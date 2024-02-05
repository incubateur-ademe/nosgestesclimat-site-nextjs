import Trans from '@/components/translation/Trans'
import Separator from '@/design-system/layout/Separator'
import { PollData } from '@/types/organizations'
import RepartitionChart from './detailedOrgaStatistics/RepartitionChart'

export default function DetailedOrgaStatistics({
  pollData,
}: {
  pollData: PollData
}) {
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
        items={pollData.simulationsRecap.map(({ bilan, isCurrentUser }) => ({
          value: bilan,
          shouldBeHighlighted: isCurrentUser,
        }))}
      />
    </section>
  )
}
