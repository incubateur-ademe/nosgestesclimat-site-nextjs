'use client'

import Button, { ButtonProps } from '@/design-system/inputs/Button'
import { createXLSXFileAndDownload } from '@/helpers/export/createXLSXFileAndDownload'
import { SimulationRecap } from '@/types/organisations'
import dayjs from 'dayjs'
import { useState } from 'react'
import Trans from '../translation/Trans'

export default function ExportDataButton({
  simulationRecaps,
  color = 'secondary',
  ...props
}: ButtonProps & {
  simulationRecaps: SimulationRecap[]
  color?: 'primary' | 'secondary'
}) {
  const [isLoading, setIsLoading] = useState(false)

  function handleClick() {
    setIsLoading(true)

    createXLSXFileAndDownload({
      data: simulationRecaps.map((simulation) => ({
        date: dayjs(simulation.date).format('DD/MM/YYYY'),
        total: Math.round(simulation.bilan),
        transport: Math.round(simulation.categories.transport),
        alimentation: Math.round(simulation.categories.alimentation),
        logement: Math.round(simulation.categories.logement),
        divers: Math.round(simulation.categories.divers),
        'services sociétaux': Math.round(
          simulation.categories['services sociétaux']
        ),
      })),
      fileName: `export-donnees-nos-gestes-climat-${dayjs().format(
        'DD-MM-YYYY_HH-MM'
      )}.xlsx`,
      callback: () => setIsLoading(false),
    })
  }
  return (
    <Button color={color} disabled={isLoading} onClick={handleClick} {...props}>
      <Trans>Exporter les données</Trans>
    </Button>
  )
}
