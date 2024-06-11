'use client'

import Button, { ButtonProps } from '@/design-system/inputs/Button'
import { createXLSXFileAndDownload } from '@/helpers/export/createXLSXFileAndDownload'
import { getComputedResults } from '@/helpers/simulation/getComputedResults'
import { useRules } from '@/hooks/useRules'
import { useSimulation } from '@/publicodes-state'
import { getDisposableEngine } from '@/publicodes-state/helpers/getDisposableEngine'
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

  const { categories } = useSimulation()

  const { data: rules } = useRules()

  function handleClick() {
    if (onClick) {
      onClick()
    }

    setIsLoading(true)

    createXLSXFileAndDownload({
      data: simulationRecaps.map((simulationRecap) => {
        const simulationRecapToParse = { ...simulationRecap }

        if (simulationRecapToParse.bilan === 0) {
          const { safeEvaluate } = getDisposableEngine({
            rules,
            situation: simulationRecap.situation,
          })

          const computedResults = getComputedResults(categories, safeEvaluate)

          return {
            ...simulationRecap,
            bilan: computedResults.bilan,
            categories: computedResults.categories,
          }
        }

        const data: Record<string, unknown> = {
          date: dayjs(simulationRecapToParse.date).format('DD/MM/YYYY'),
          total: Math.round(simulationRecapToParse.bilan),
          transport: Math.round(simulationRecapToParse.categories.transport),
          alimentation: Math.round(
            simulationRecapToParse.categories.alimentation
          ),
          logement: Math.round(simulationRecapToParse.categories.logement),
          divers: Math.round(simulationRecapToParse.categories.divers),
          'services sociétaux': Math.round(
            simulationRecapToParse.categories['services sociétaux']
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
