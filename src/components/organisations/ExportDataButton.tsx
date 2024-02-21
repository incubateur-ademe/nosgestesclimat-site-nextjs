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
        total: simulation.bilan,
        transport: simulation.categories.transport,
        alimentation: simulation.categories.alimentation,
        logement: simulation.categories.logement,
        divers: simulation.categories.divers,
        'services sociétaux': simulation.categories['services sociétaux'],
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