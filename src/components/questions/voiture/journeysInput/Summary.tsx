import { Journey } from '@/types/journey'

type Props = {
  journeys: Journey[]
}

const periods: Record<string, number> = {
  day: 365,
  week: 52,
  month: 12,
  year: 1,
}

export default function Summary({ journeys }: Props) {
  const total = journeys.reduce(
    (accumulator, currentValue) =>
      accumulator +
      currentValue.distance *
        currentValue.reccurrence *
        periods[currentValue.period],
    0
  )
  const averagePassengers =
    journeys.reduce(
      (accumulator, currentValue) => accumulator + currentValue.passengers,
      0
    ) / journeys.length
  return (
    <div>
      {total} km avec en moyenne {averagePassengers} voyageurs
    </div>
  )
}
