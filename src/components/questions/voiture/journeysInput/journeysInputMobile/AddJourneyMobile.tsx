import {
  labels,
  periods,
} from '@/components/questions/voiture/journeysInput/_components/JourneyItem'
import Trans from '@/components/translation/Trans'
import Button from '@/design-system/inputs/Button'
import Select from '@/design-system/inputs/Select'
import TextInputGroup from '@/design-system/inputs/TextInputGroup'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { Journey } from '@/types/journey'
import { Dispatch, SetStateAction, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { v4 as uuid } from 'uuid'

type Props = {
  setJourneys: Dispatch<SetStateAction<Journey[]>>
  className?: string
}

export default function AddJourneyMobile({ setJourneys, className }: Props) {
  const { t } = useClientTranslation()
  const [label, setLabel] = useState('holidays')
  const [distance, setDistance] = useState('10')
  const [reccurrence, setReccurrence] = useState(1)
  const [period, setPeriod] = useState('week')
  const [passengers, setPassengers] = useState(1)

  return (
    <tr
      className={twMerge('block border-b border-primary-700  p-2', className)}>
      <td className="mb-4 block text-sm ">
        <Select
          className="w-48 text-sm"
          value={label}
          name="label"
          label={t('Label')}
          onChange={(e) => setLabel(e.target.value)}>
          {Object.entries(labels).map(([key, label], i) => {
            return (
              <option key={i} value={key}>
                {t(label)}
              </option>
            )
          })}
        </Select>
      </td>
      <td className="block border-primary-700 pb-4 text-sm ">
        <span className="flex items-end gap-4">
          <TextInputGroup
            className="w-12 text-sm md:w-16"
            name="distance"
            type="number"
            label={t('Distance')}
            value={distance}
            onChange={(e) => setDistance((e.target as HTMLInputElement).value)}
          />{' '}
          <span className="mb-4 inline-block">km</span>
        </span>
      </td>
      <td className="block border-primary-700 pb-4 text-sm">
        <span className="flex items-end gap-4">
          <TextInputGroup
            className="w-16 text-sm"
            name="frequence"
            type="number"
            label={t('Fréquence')}
            value={reccurrence}
            onChange={(e) =>
              setReccurrence(Number((e.target as HTMLInputElement).value))
            }
          />{' '}
          <span className="mb-4 inline-block">x</span>
          <Select
            className="text-sm"
            value={period}
            name="period"
            label={t('Période')}
            onChange={(e) => setPeriod(e.target.value)}>
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
      <td className="block border-primary-700 pb-4 text-sm">
        <Select
          className="w-16 text-sm"
          name="passengers"
          value={passengers}
          label={t('Passagers')}
          onChange={(e) => setPassengers(Number(e.target.value))}>
          {new Array(5).fill(0).map((_, i) => {
            return (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            )
          })}
        </Select>
      </td>
      <td className="block border-primary-700 pl-2 text-right text-sm">
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
