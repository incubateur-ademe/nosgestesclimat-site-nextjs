import Trans from '@/components/translation/Trans'
import { defaultMetric } from '@/constants/metric'
import Emoji from '@/design-system/utils/Emoji'
import type { Group } from '@/types/groups'

type Props = {
  group: Group
}

export default function LaconicRanking({ group }: Props) {
  // If only one participant
  if (group.participants.length === 1) {
    return (
      <section className="mt-6 rounded-xl bg-primary-50 p-4">
        <p className="mb-0">
          <Trans>Qui de </Trans>{' '}
          <strong className="text-primary-700">
            {group.participants[0].name}
          </strong>{' '}
          <Trans>et vous aura la plus faible empreinte ?</Trans>{' '}
          <Emoji>🤓</Emoji>
        </p>
      </section>
    )
  }

  const particpantsOrdered = group.participants.sort((a, b) => {
    const computedResultsA = a.simulation.computedResults
    const computedResultsB = b.simulation.computedResults

    if (!computedResultsA || !computedResultsB) {
      return 0
    }

    return computedResultsA?.[defaultMetric]?.bilan <
      computedResultsB?.[defaultMetric]?.bilan
      ? -1
      : 1
  })

  // Display a list of participants with their rank and an emoji medal for the first three
  // then a number for the rest
  return (
    <section className="mt-6 rounded-xl bg-primary-50 p-6">
      <h3 className="font-bold">
        <Trans>Le classement</Trans>
      </h3>

      <ul>
        {particpantsOrdered.map((participant, index) => {
          const isFirstThree = index < 3

          let rank
          switch (index) {
            case 0:
              rank = <Emoji>🥇</Emoji>
              break
            case 1:
              rank = <Emoji>🥈</Emoji>
              break
            case 2:
              rank = <Emoji>🥉</Emoji>
              break
            default:
              rank = index + 1
          }
          return (
            <li
              key={`participant-${index}`}
              className="flex items-center gap-4">
              <span
                className={
                  !isFirstThree ? 'ml-1 mr-0.5 text-sm font-bold' : ''
                }>
                {rank}
                {!isFirstThree && '. '}
              </span>{' '}
              {participant.name}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
