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

  const [isInitialized, setIsInitialized] = useState(false)

  const [journeys, setJourneys] = useState<Journey[]>([])

  useEffect(() => {
    setJourneys(JSON.parse(localStorage.getItem(question) || '[]'))
    setIsInitialized(true)
  }, [question])

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(question, JSON.stringify(journeys))
    }
  }, [journeys, isInitialized, question])

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

  const averagePassengers = useMemo(() => {
    if (!total) {
      return 1
    } else {
      return (
        journeys.reduce(
          (accumulator, currentValue) =>
            accumulator +
            currentValue.passengers *
              currentValue.distance *
              currentValue.reccurrence *
              periods[currentValue.period],
          0
        ) / total
      )
    }
  }, [journeys, total])

  const totalForOnePassenger = useMemo(
    () => (journeys.length ? total / averagePassengers : 0),
    [journeys, total, averagePassengers]
  )
  const prevTotalForOnePassenger = useRef(totalForOnePassenger)

  useEffect(() => {
    if (prevTotalForOnePassenger.current !== totalForOnePassenger) {
      setValue(totalForOnePassenger.toFixed(1), question)
    }
    prevTotalForOnePassenger.current = totalForOnePassenger
  }, [totalForOnePassenger, setValue, question])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className="mb-2 w-full overflow-scroll rounded-lg bg-white p-2">
      <table className="block w-full border-collapse md:table">
        <tbody className="block w-full">
          <tr className="block w-full md:table-row">
            <th className="block px-4 py-2 text-left text-sm md:table-cell">
              <Trans>Label</Trans>
            </th>
            <th className="block px-4 py-2 text-left text-sm md:table-cell">
              <Trans>Distance</Trans>
            </th>
            <th className="block px-4 py-2 text-left text-sm md:table-cell">
              <Trans>Fréquence</Trans>
            </th>
            <th className="block px-4 py-2 text-left text-sm md:table-cell">
              <Trans>Passagers</Trans>
            </th>
            <th className="block px-4 py-2 text-left text-sm opacity-0 md:table-cell">
              Options
            </th>
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
