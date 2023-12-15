import {
  labels,
  periods,
} from '@/components/questions/voiture/journeysInput/_components/JourneyItem'
import Trans from '@/components/translation/Trans'
import Button from '@/design-system/inputs/Button'
import Select from '@/design-system/inputs/Select'
import TextInputGroup from '@/design-system/inputs/TextInputGroup'
import { Journey } from '@/types/journey'
import { Dispatch, SetStateAction, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { twMerge } from 'tailwind-merge'
import { v4 as uuid } from 'uuid'

type Props = {
  setJourneys: Dispatch<SetStateAction<Journey[]>>
  className?: string
}

export default function AddJourneyMobile({ setJourneys, className }: Props) {
  const { t } = useTranslation()
  const [label, setLabel] = useState('holidays')
  const [distance, setDistance] = useState('10')
  const [reccurrence, setReccurrence] = useState(1)
  const [period, setPeriod] = useState('week')
  const [passengers, setPassengers] = useState(1)

  return (
    <tr className={twMerge('block p-2 md:table-row', className)}>
      <td className="mb-4 mt-8 block border-t border-primary-500 pt-8 text-sm md:table-cell">
        <Select
          className="text-sm"
          value={label}
          name="label"
          label={t('Label')}
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
      <td className="block border-primary-500 pb-4 text-sm md:table-cell md:border-t md:px-4">
        <span className="flex items-end gap-4">
          <TextInputGroup
            className="w-12 text-sm md:w-16"
            name="distance"
            type="number"
            label={t('Distance')}
            value={distance}
            onChange={(e) => setDistance(e.currentTarget.value)}
          />{' '}
          <span className="mb-4 inline-block">km</span>
        </span>
      </td>
      <td className="block border-primary-500 pb-4 text-sm md:table-cell md:border-t md:px-4">
        <span className="flex items-end gap-4">
          <TextInputGroup
            className="max-w-[10rem] text-sm"
            name="frequence"
            type="number"
            label={t('Fréquence')}
            value={reccurrence}
            onChange={(e) => setReccurrence(Number(e.currentTarget.value))}
          />{' '}
          <span className="mb-4 inline-block">x</span>
          <Select
            className="text-sm"
            value={period}
            name="period"
            label={t('Période')}
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
      <td className="block border-primary-500 pb-4 text-sm md:table-cell md:border-t md:px-4">
        <Select
          className="text-sm"
          name="passengers"
          value={passengers}
          label={t('Passagers')}
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
      <td className="block border-primary-500 pl-2 text-right text-sm md:table-cell md:border-t md:pl-4 md:pr-2">
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
