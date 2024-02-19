import { orderedCategories } from '@/constants/orderedCategories'
import { DottedName, NodeValue } from '@/publicodes-state/types'
import { SimulationResults } from '@/types/groups'

export const getSimulationResults = ({
  getValue,
}: {
  getValue: (dottedName: DottedName) => NodeValue
}): SimulationResults => {
  const resultsObject: any = {
    categories: {},
  }

  orderedCategories.forEach((category: any) => {
    // Which util should be used here to avoid using toFixed(2) ?
    resultsObject.categories[category] = (
      Math.round(((category.nodeValue as number) ?? 0) / 10) / 100
    ).toFixed(2)
  })

  const valueBilan = getValue('bilan')

  resultsObject.bilan = ((valueBilan as number) / 10 / 100).toFixed(2)

  return resultsObject
}
