'use client'

import {
  labels,
  periods,
} from '@/components/specialQuestions/voiture/journeysInput/_components/JourneyItem'
import Trans from '@/components/translation/trans/TransClient'
import Button from '@/design-system/buttons/Button'
import Select from '@/design-system/inputs/Select'
import TextInputGroup from '@/design-system/inputs/TextInputGroup'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import type { Journey } from '@/types/journey'
import type { Dispatch, SetStateAction } from 'react'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { v4 as uuid } from 'uuid'

type Props = {
  setJourneys: Dispatch<SetStateAction<Journey[]>>
  className?: string
}

export default function AddJourneyDesktop({ setJourneys, className }: Props) {
  const { t } = useClientTranslation()
  const [label, setLabel] = useState('holidays')
  const [distance, setDistance] = useState('10')
  const [reccurrence, setReccurrence] = useState(1)
  const [period, setPeriod] = useState('week')
  const [passengers, setPassengers] = useState(1)

  return (
    <tr className={twMerge('block md:table-row', className)}>
      <td className="border-primary-700 block border-t py-2 pr-2 text-xs md:table-cell md:pr-2">
        <Select
          aria-labelledby="label-label"
          className="mt-0 p-2 text-xs"
          value={label}
          name="label"
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
      <td className="border-primary-700 block h-full py-2 text-xs md:table-cell md:border-t md:px-2">
        <span className="flex h-full items-center gap-4">
          <TextInputGroup
            className="h-14 w-12 p-2 text-xs md:w-16"
            aria-labelledby="label-distance"
            name="distance"
            type="number"
            value={distance}
            onChange={(e) => setDistance((e.target as HTMLInputElement).value)}
          />{' '}
          km
        </span>
      </td>
      <td className="border-primary-700 block py-2 text-xs md:table-cell md:border-t md:px-2">
        <span className="flex items-center gap-4">
          <TextInputGroup
            className="h-14 w-12 p-2 text-xs md:w-16"
            name="reccurrence"
            aria-labelledby="label-frequency"
            type="number"
            value={reccurrence}
            onChange={(e) =>
              setReccurrence(Number((e.target as HTMLInputElement).value))
            }
          />{' '}
          x
          <Select
            className="mt-0! p-2 text-xs"
            value={period}
            label={t('Période')}
            labelClassName="sr-only p-0 m-0"
            name="period"
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
      <td className="border-primary-700 block py-2 text-xs md:table-cell md:border-t md:px-2">
        <Select
          name="passengers"
          aria-labelledby="label-passengers"
          className="mt-0 p-2 text-xs"
          value={passengers}
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
      <td className="border-primary-700 block py-2 pl-2 text-right text-xs md:table-cell md:border-t">
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
