import Button from '@/design-system/inputs/Button'
import { Journey } from '@/types/journey'
import { Dispatch, SetStateAction } from 'react'

type Props = {
  journey: Journey
  odd: boolean
  setJourneys: Dispatch<SetStateAction<Journey[]>>
}

export default function AddJourney({ journey, odd, setJourneys }: Props) {
  return (
    <tr className={odd ? 'bg-primaryLight' : ''}>
      <td className="px-4 py-2 text-left text-sm">{journey.label}</td>
      <td className="px-4 py-2 text-left text-sm">{journey.distance} km</td>
      <td className="px-4 py-2 text-left text-sm">
        {journey.reccurrence} x {journey.period}
      </td>
      <td className="px-4 py-2 text-left text-sm">{journey.passengers}</td>
      <td className="py-2 pl-4 pr-2 text-right text-sm">
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
