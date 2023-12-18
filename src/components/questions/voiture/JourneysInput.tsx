import { useRule } from '@/publicodes-state'
import { Journey } from '@/types/journey'

import { useEffect, useMemo, useRef, useState } from 'react'

import { JourneysInputDesktop } from './journeysInput/JourneysInputDesktop'
import JourneysInputMobile from './journeysInput/JourneysInputMobile'

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
    <>
      <JourneysInputDesktop
        journeys={journeys}
        setJourneys={setJourneys}
        averagePassengers={averagePassengers}
        total={total}
        totalForOnePassenger={totalForOnePassenger}
      />

      <JourneysInputMobile
        journeys={journeys}
        setJourneys={setJourneys}
        averagePassengers={averagePassengers}
        total={total}
        totalForOnePassenger={totalForOnePassenger}
      />
    </>
  )
}
