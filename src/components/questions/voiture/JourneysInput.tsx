import Trans from '@/components/translation/Trans'
import { useRule } from '@/publicodes-state'
import { Journey } from '@/types/journey'
import { motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import AddJourney from './journeysInput/AddJourney'
import JourneyItem from './journeysInput/JourneyItem'
import Summary from './journeysInput/Summary'

type Props = {
  question: string
}

const periods: Record<string, number> = {
  day: 365,
  week: 52,
  month: 12,
  year: 1,
}

export default function JourneysInput({ question }: Props) {
  const { setValue } = useRule(question)

  const [journeys, setJourneys] = useState<Journey[]>([])

  const total = useMemo(
    () =>
      journeys.reduce(
        (accumulator, currentValue) =>
          accumulator +
          currentValue.distance *
            currentValue.reccurrence *
            periods[currentValue.period],
        0
      ),
    [journeys]
  )

  const averagePassengers = useMemo(
    () =>
      journeys.reduce(
        (accumulator, currentValue) =>
          accumulator +
          currentValue.passengers *
            currentValue.distance *
            currentValue.reccurrence *
            periods[currentValue.period],
        0
      ) / total || 0,
    [journeys, total]
  )

  const totalForOnePassenger = useMemo(
    () => (journeys.length ? total / averagePassengers : 0),
    [journeys, total, averagePassengers]
  )
  const prevTotalForOnePassenger = useRef(totalForOnePassenger)

  useEffect(() => {
    if (prevTotalForOnePassenger.current !== totalForOnePassenger) {
      setValue(totalForOnePassenger)
    }
    prevTotalForOnePassenger.current = totalForOnePassenger
  }, [totalForOnePassenger, setValue])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className="mb-2 w-full overflow-scroll rounded-lg bg-white p-2">
      <table className="w-full border-collapse">
        <tbody>
          <tr>
            <th className="px-4 py-2 text-left text-sm">
              <Trans>Label</Trans>
            </th>
            <th className="px-4 py-2 text-left text-sm">
              <Trans>Distance</Trans>
            </th>
            <th className="px-4 py-2 text-left text-sm">
              <Trans>Fréquence</Trans>
            </th>
            <th className="px-4 py-2 text-left text-sm">
              <Trans>Passagers</Trans>
            </th>
            <th className="px-4 py-2 text-left text-sm"></th>
          </tr>
          {journeys.map((journey, index) => (
            <JourneyItem
              key={journey.id}
              journey={journey}
              odd={index % 2 ? false : true}
              setJourneys={setJourneys}
            />
          ))}
          <AddJourney key={journeys.length} setJourneys={setJourneys} />
        </tbody>
      </table>
      <Summary
        total={total}
        averagePassengers={averagePassengers}
        totalForOnePassenger={totalForOnePassenger}
      />
    </motion.div>
  )
}
