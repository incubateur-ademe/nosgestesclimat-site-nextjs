import {
  labels,
  periods,
} from '@/components/questions/voiture/journeysInput/JourneyItem'
import Trans from '@/components/translation/Trans'
import Button from '@/design-system/inputs/Button'
import Select from '@/design-system/inputs/Select'
import TextInputGroup from '@/design-system/inputs/TextInputGroup'
import { Journey } from '@/types/journey'
import { Dispatch, SetStateAction, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { v4 as uuid } from 'uuid'

type Props = {
  setJourneys: Dispatch<SetStateAction<Journey[]>>
}

export default function JourneyItem({ setJourneys }: Props) {
  const { t } = useTranslation()
  const [label, setLabel] = useState('holidays')
  const [distance, setDistance] = useState('10')
  const [reccurrence, setReccurrence] = useState(1)
  const [period, setPeriod] = useState('week')
  const [passengers, setPassengers] = useState(1)

  return (
    <tr className="block md:table-row">
      <td className="block border-t border-primary-500 py-4 pl-2 pr-2 text-sm md:table-cell md:pr-4">
        <Select
          className="p-2 text-sm"
          value={label}
          onChange={(e) => setLabel(e.currentTarget.value)}>
          {Object.entries(labels).map(([key, label], i) => {
            return (
              <option key={i} value={key}>
                {t(label)}
              </option>
            )
          })}
        </Select>
      </td>
      <td className="block border-t border-primary-500 px-2 py-4 text-sm md:table-cell md:px-4">
        <span className="flex items-center gap-4">
          <TextInputGroup
            className="w-12 p-2 text-sm md:w-16"
            name="distance"
            type="number"
            value={distance}
            onChange={(e) => setDistance(e.currentTarget.value)}
          />{' '}
          km
        </span>
      </td>
      <td className="block border-t border-primary-500 px-2 py-4 text-sm md:table-cell md:px-4">
        <span className="flex items-center gap-4">
          <TextInputGroup
            className="w-12 p-2 text-sm md:w-16"
            name="distance"
            type="number"
            value={reccurrence}
            onChange={(e) => setReccurrence(Number(e.currentTarget.value))}
          />{' '}
          x
          <Select
            className="p-2 text-sm"
            value={period}
            onChange={(e) => setPeriod(e.currentTarget.value)}>
            {Object.entries(periods).map(([key, period], i) => {
              return (
                <option key={i} value={key}>
                  {t(period)}
                </option>
              )
            })}
          </Select>
        </span>
      </td>
      <td className="block border-t border-primary-500 px-2 py-4 text-sm md:table-cell md:px-4">
        <Select
          className="p-2 text-sm"
          value={passengers}
          onChange={(e) => setPassengers(Number(e.currentTarget.value))}>
          {new Array(5).fill(0).map((_, i) => {
            return (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            )
          })}
        </Select>
      </td>
      <td className="block border-t border-primary-500 py-4 pl-2 pr-2 text-right text-sm md:table-cell md:pl-4">
        <Button
          size="sm"
          onClick={() =>
            setJourneys((prevJourneys) => [
              ...prevJourneys,
              {
                id: uuid(),
                label,
                distance: Number(distance),
                reccurrence,
                period,
                passengers,
              },
            ])
          }>
          <Trans>Ajouter</Trans>
        </Button>
      </td>
    </tr>
  )
}
