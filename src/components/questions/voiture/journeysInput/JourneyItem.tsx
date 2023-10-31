import Trans from '@/components/translation/Trans'
import Button from '@/design-system/inputs/Button'
import { Journey } from '@/types/journey'
import { Dispatch, SetStateAction } from 'react'

type Props = {
  journey: Journey
  odd: boolean
  setJourneys: Dispatch<SetStateAction<Journey[]>>
}

const periods: Record<string, string> = {
  day: 'jour',
  week: 'semaine',
  month: 'mois',
  year: 'an',
}

export default function AddJourney({ journey, odd, setJourneys }: Props) {
  return (
    <tr className={odd ? 'bg-primaryLight' : ''}>
      <td
        className={`border-x ${
          odd ? 'border-white' : 'border-primaryLight'
        } px-4 py-2 text-left text-sm`}>
        {journey.label}
      </td>
      <td
        className={`border-x ${
          odd ? 'border-white' : 'border-primaryLight'
        } px-4 py-2 text-left text-sm`}>
        {journey.distance} km
      </td>
      <td
        className={`border-x ${
          odd ? 'border-white' : 'border-primaryLight'
        } px-4 py-2 text-left text-sm`}>
        {journey.reccurrence} x <Trans>{periods[journey.period]}</Trans>
      </td>
      <td className={`px-4 py-2 text-left text-sm`}>{journey.passengers}</td>
      <td className={`py-2 pl-4 pr-2 text-right text-sm`}>
        <Button
          color="text"
          size="sm"
          onClick={() =>
            setJourneys((prevJourneys) =>
              prevJourneys.filter(
                (prevJourney) => prevJourney.id !== journey.id
              )
            )
          }>
          x
        </Button>
      </td>
    </tr>
  )
}
