'use client'

import { carboneMetric } from '@/constants/metric'
import Button, { ButtonProps } from '@/design-system/inputs/Button'
import { createXLSXFileAndDownload } from '@/helpers/export/createXLSXFileAndDownload'
import { PollData, SimulationRecap } from '@/types/organisations'
import dayjs from 'dayjs'
import { useState } from 'react'
import DownloadIcon from '../icons/DownloadIcon'
import Trans from '../translation/Trans'

type Props = {
  poll: PollData | undefined | null
  simulationRecaps: SimulationRecap[]
  color?: 'primary' | 'secondary'
  onClick?: () => void
}

export default function ExportDataButton({
  poll,
  simulationRecaps,
  color = 'secondary',
  onClick,
  ...props
}: ButtonProps & Props) {
  const [isLoading, setIsLoading] = useState(false)

  if (simulationRecaps?.length < 3) return null

  function handleClick() {
    if (onClick) {
      onClick()
    }

    setIsLoading(true)

    createXLSXFileAndDownload({
      data: simulationRecaps.map((simulationRecap) => {
        const simulationRecapToParse = { ...simulationRecap }

        const data: Record<string, unknown> = {
          date: dayjs(simulationRecapToParse.date).format('DD/MM/YYYY'),
          total: Math.round(
            simulationRecapToParse.computedResults[carboneMetric].bilan
          ),
          transport: Math.round(
            simulationRecapToParse.computedResults[carboneMetric].categories
              .transport
          ),
          alimentation: Math.round(
            simulationRecapToParse.computedResults[carboneMetric].categories
              .alimentation
          ),
          logement: Math.round(
            simulationRecapToParse.computedResults[carboneMetric].categories
              .logement
          ),
          divers: Math.round(
            simulationRecapToParse.computedResults[carboneMetric].categories
              .divers
          ),
          'services sociétaux': Math.round(
            simulationRecapToParse.computedResults[carboneMetric].categories[
              'services sociétaux'
            ]
          ),
        }

        if (poll?.customAdditionalQuestions) {
          poll.customAdditionalQuestions.forEach(({ _id, question }) => {
            data[question as string] =
              simulationRecapToParse.customAdditionalQuestionsAnswers?.[
                _id ?? ''
              ] ?? ''
          })
        }

        return data
      }),
      fileName: `export-donnees-nos-gestes-climat-${dayjs().format(
        'DD-MM-YYYY_HH-MM'
      )}.xlsx`,
      callback: () => setIsLoading(false),
    })
  }
  return (
    <Button color={color} disabled={isLoading} onClick={handleClick} {...props}>
      <DownloadIcon className="mr-2 fill-primary-700" />
      <Trans>Exporter les données</Trans>
    </Button>
  )
}
