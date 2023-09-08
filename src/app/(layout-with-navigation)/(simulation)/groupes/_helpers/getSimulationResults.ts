import { orderedCategories } from '@/constants/orderedCategories'
import { SimulationResults } from '@/types/groups'

export const getSimulationResults = ({
  getValue,
}: {
  getValue: (dottedName: string) => number
}): SimulationResults => {
  const resultsObject: any = {}

  orderedCategories.forEach((category: any) => {
    resultsObject[
      category === 'transport . empreinte' ? 'transports' : category
    ] = (Math.round(((category.nodeValue as number) ?? 0) / 10) / 100).toFixed(
      2
    )
  })

  const valueBilan = getValue('bilan')

  resultsObject.total = (valueBilan / 10 / 100).toFixed(2)

  return resultsObject
}
