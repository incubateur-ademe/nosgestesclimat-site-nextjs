import Button from '@/design-system/inputs/Button'
import TextInputGroup from '@/design-system/inputs/TextInputGroup'
import { Journey } from '@/types/journey'
import { Dispatch, SetStateAction, useState } from 'react'
import { v4 as uuid } from 'uuid'

type Props = {
  setJourneys: Dispatch<SetStateAction<Journey[]>>
}

export default function JourneyItem({ setJourneys }: Props) {
  const [label, setLabel] = useState('')
  const [distance, setDistance] = useState(0)
  const [reccurrence, setReccurrence] = useState(1)
  const [period, setPeriod] = useState('day')
  const [passengers, setPassengers] = useState(1)

  return (
    <tr className="">
      <td className="border-t border-primary py-4 pl-2 pr-4 text-sm">
        <TextInputGroup
          className="w-32 p-2 text-sm"
          name="label"
          value={label}
          onChange={(e) => setLabel(e.currentTarget.value)}
        />
      </td>
      <td className="border-t border-primary px-4 py-4 text-sm">
        <span className="flex items-center gap-2">
          <TextInputGroup
            className="w-16 p-2 text-sm"
            name="distance"
            type="number"
            value={distance}
            onChange={(e) => setDistance(Number(e.currentTarget.value))}
          />{' '}
          km
        </span>
      </td>
      <td className="border-t border-primary px-4 py-4 text-sm">
        <span className="flex items-center gap-2">
          <TextInputGroup
            className="w-16 p-2 text-sm"
            name="distance"
            type="number"
            value={reccurrence}
            onChange={(e) => setReccurrence(Number(e.currentTarget.value))}
          />{' '}
          x
          <select
            value={period}
            onChange={(e) =>
              setPeriod(e.currentTarget.value as Journey['period'])
            }>
            <option value="day">jour</option>
            <option value="week">semaine</option>
            <option value="month">mois</option>
            <option value="year">an</option>
          </select>
        </span>
      </td>
      <td className="border-t border-primary px-4 py-4 text-sm">
        <select
          value={passengers}
          onChange={(e) => setPassengers(Number(e.currentTarget.value))}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </td>
      <td className="border-t border-primary py-4 pl-4 pr-2 text-right text-sm">
        <Button
          size="sm"
          onClick={() =>
            setJourneys((prevJourneys) => [
              ...prevJourneys,
              { id: uuid(), label, distance, reccurrence, period, passengers },
            ])
          }>
          Ajouter
        </Button>
      </td>
    </tr>
  )
}
