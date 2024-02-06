'use client'

import Button from '@/design-system/inputs/Button'
import { createCSVFileAndDownload } from '@/helpers/export/createCSVFileAndDownload'
import { SimulationRecap } from '@/types/organizations'
import { useState } from 'react'
import Trans from '../translation/Trans'

export default function ExportDataButton({
  simulationsRecap,
  ...props
}: {
  simulationsRecap: SimulationRecap[]
}) {
  const [isLoading, setIsLoading] = useState(false)
  function handleClick() {
    setIsLoading(true)

    createCSVFileAndDownload({
      csvHeaderRow:
        'bilan,transport,alimentation,logement,divers,services sociétaux,',
      csvDataRows: simulationsRecap.map(
        (simulation) =>
          `${simulation.bilan},${simulation.categories.transport},${simulation.categories.alimentation},${simulation.categories.logement},${simulation.categories.divers},${simulation.categories['services sociétaux']},`
      ),
      callback: () => setIsLoading(false),
    })
  }
  return (
    <Button disabled={isLoading} onClick={handleClick} {...props}>
      <Trans>Exporter les données</Trans>
    </Button>
  )
}
