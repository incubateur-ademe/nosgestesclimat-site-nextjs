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
  const [distance, setDistance] = useState(10)
  const [reccurrence, setReccurrence] = useState(1)
  const [period, setPeriod] = useState('week')
  const [passengers, setPassengers] = useState(1)

  return (
    <tr className="">
      <td className="border-t border-primary py-4 pl-2 pr-2 text-sm md:pr-4">
        <TextInputGroup
          className="w-16 p-2 text-sm md:w-24"
          name="label"
          value={label}
          onChange={(e) => setLabel(e.currentTarget.value)}
        />
      </td>
      <td className="border-t border-primary px-2 py-4 text-sm md:px-4">
        <span className="flex items-center gap-2">
          <TextInputGroup
            className="w-12 p-2 text-sm md:w-16"
            name="distance"
            type="number"
            value={distance}
            onChange={(e) => setDistance(Number(e.currentTarget.value))}
          />{' '}
          km
        </span>
      </td>
      <td className="border-t border-primary px-2 py-4 text-sm md:px-4">
        <span className="flex items-center gap-2">
          <TextInputGroup
            className="w-12 p-2 text-sm md:w-16"
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
      <td className="border-t border-primary px-2 py-4 text-sm md:px-4">
        <select
          className="w-12"
          value={passengers}
          onChange={(e) => setPassengers(Number(e.currentTarget.value))}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </td>
      <td className="border-t border-primary py-4 pl-2 pr-2 text-right text-sm md:pl-4">
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
