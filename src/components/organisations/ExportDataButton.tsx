'use client'

import { carboneMetric } from '@/constants/metric'
import type { ButtonProps } from '@/design-system/inputs/Button'
import Button from '@/design-system/inputs/Button'
import { createXLSXFileAndDownload } from '@/helpers/export/createXLSXFileAndDownload'
import { useFetchPublicPollSimulations } from '@/hooks/organisations/polls/useFetchPublicPollSimulations'
import type { PublicOrganisationPoll } from '@/types/organisations'
import dayjs from 'dayjs'
import { useState } from 'react'
import DownloadIcon from '../icons/DownloadIcon'
import Trans from '../translation/Trans'

type Props = {
  poll?: PublicOrganisationPoll | null
  color?: 'primary' | 'secondary'
  onClick?: () => void
}

export default function ExportDataButton({
  poll,
  color = 'secondary',
  onClick,
  ...props
}: ButtonProps & Props) {
  const [isLoading, setIsLoading] = useState(false)

  const { data: simulations } = useFetchPublicPollSimulations()

  if (!simulations || simulations.length < 3) return null

  const pollSimulations = simulations

  const handleClick = () => {
    if (onClick) {
      onClick()
    }

    setIsLoading(true)

    createXLSXFileAndDownload({
      data: pollSimulations.map((simulation) => {
        const simulationToParse = { ...simulation }

        const data: Record<string, unknown> = {
          date: dayjs(simulationToParse.date).format('DD/MM/YYYY'),
          total: Math.round(
            simulationToParse.computedResults[carboneMetric].bilan
          ),
          transport: Math.round(
            simulationToParse.computedResults[carboneMetric].categories
              .transport
          ),
          alimentation: Math.round(
            simulationToParse.computedResults[carboneMetric].categories
              .alimentation
          ),
          logement: Math.round(
            simulationToParse.computedResults[carboneMetric].categories.logement
          ),
          divers: Math.round(
            simulationToParse.computedResults[carboneMetric].categories.divers
          ),
          'services sociétaux': Math.round(
            simulationToParse.computedResults[carboneMetric].categories[
              'services sociétaux'
            ]
          ),
        }

        if (poll?.customAdditionalQuestions) {
          poll.customAdditionalQuestions.forEach(({ question }) => {
            data[question] =
              simulationToParse.additionalQuestionsAnswers.find(
                ({ key }) => key === question
              )?.answer ?? ''
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
      <DownloadIcon className="fill-primary-700 mr-2" />
      <Trans locale={locale}>Exporter les données</Trans>
    </Button>
  )
}
