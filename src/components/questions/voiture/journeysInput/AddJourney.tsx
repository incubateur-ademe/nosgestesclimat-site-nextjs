import {
  labels,
  periods,
} from '@/components/questions/voiture/journeysInput/JourneyItem'
import Trans from '@/components/translation/Trans'
import Button from '@/design-system/inputs/Button'
import Select from '@/design-system/inputs/Select'
import TextInputGroup from '@/design-system/inputs/TextInputGroup'
import { Journey } from '@/types/journey'
import { TFunction } from 'i18next'
import { Dispatch, SetStateAction, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { v4 as uuid } from 'uuid'

type Props = {
  setJourneys: Dispatch<SetStateAction<Journey[]>>
}

function Selector<T extends string | number>({
  value,
  items,
  setValue,
  t,
}: {
  value: T
  items: Record<string, T>
  setValue: Dispatch<SetStateAction<T>>
  t: TFunction
}) {
  return (
    <Select
      className="p-2 text-sm"
      value={value}
      onChange={(e) => setValue(e.currentTarget.value as T)}>
      {Object.entries(items).map(([key, label], i) => {
        return (
          <option key={i} value={key}>
            {t(label.toString())}
          </option>
        )
      })}
    </Select>
  )
}

export default function JourneyItem({ setJourneys }: Props) {
  const { t } = useTranslation()
  const [label, setLabel] = useState('holidays')
  const [distance, setDistance] = useState('10')
  const [reccurrence, setReccurrence] = useState(1)
  const [period, setPeriod] = useState('week')
  const [passengers, setPassengers] = useState(1)

  return (
    <tr className="">
      <td className="border-t border-primary py-4 pl-2 pr-2 text-sm md:pr-4">
        <Selector value={label} items={labels} setValue={setLabel} t={t} />
      </td>
      <td className="border-t border-primary px-2 py-4 text-sm md:px-4">
        <span className="flex items-center gap-2">
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
          <Selector value={period} items={periods} setValue={setPeriod} t={t} />
        </span>
      </td>
      <td className="border-t border-primary px-2 py-4 text-sm md:px-4">
        <Selector
          value={passengers}
          items={Object.fromEntries(
            new Array(5).fill(0).map((_, i) => [i + 1, i + 1])
          )}
          setValue={setPassengers}
          t={t}
        />
      </td>
      <td className="border-t border-primary py-4 pl-2 pr-2 text-right text-sm md:pl-4">
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
