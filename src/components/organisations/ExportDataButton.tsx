'use client'

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

  function handleClick() {
    if (onClick) {
      onClick()
    }

    setIsLoading(true)

    createXLSXFileAndDownload({
      data: simulationRecaps.map((simulation) => {
        const data: Record<string, unknown> = {
          date: dayjs(simulation.date).format('DD/MM/YYYY'),
          total: Math.round(simulation.bilan),
          transport: Math.round(simulation.categories.transport),
          alimentation: Math.round(simulation.categories.alimentation),
          logement: Math.round(simulation.categories.logement),
          divers: Math.round(simulation.categories.divers),
          'services sociétaux': Math.round(
            simulation.categories['services sociétaux']
          ),
        }

        if (poll?.customAdditionalQuestions) {
          poll.customAdditionalQuestions.forEach(({ _id, question }) => {
            data[question as string] =
              simulation.customAdditionalQuestionsAnswers?.[_id ?? ''] ?? ''
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
