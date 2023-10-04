import { orderedCategories } from '@/constants/orderedCategories'
import { NodeValue } from '@/publicodes-state/types'
import { SimulationResults } from '@/types/groups'

export const getSimulationResults = ({
  getValue,
}: {
  getValue: (dottedName: string) => NodeValue
}): SimulationResults => {
  const resultsObject: any = {}

  orderedCategories.forEach((category: any) => {
    resultsObject[category] = (
      Math.round(((category.nodeValue as number) ?? 0) / 10) / 100
    ).toFixed(2)
  })

  const valueBilan = getValue('bilan')

  resultsObject.total = ((valueBilan as number) / 10 / 100).toFixed(2)

  return resultsObject
}
