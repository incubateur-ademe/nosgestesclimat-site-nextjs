import Trans from '@/components/translation/Trans'
import { Journey } from '@/types/journey'
import { motion } from 'framer-motion'
import { useState } from 'react'
import AddJourney from './journeysInput/AddJourney'
import JourneyItem from './journeysInput/JourneyItem'
import Summary from './journeysInput/Summary'

type Props = {
  question: string
}
export default function JourneysInput({ question }: Props) {
  const [journeys, setJourneys] = useState<Journey[]>([])

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
      <Summary journeys={journeys} />
    </motion.div>
  )
}
