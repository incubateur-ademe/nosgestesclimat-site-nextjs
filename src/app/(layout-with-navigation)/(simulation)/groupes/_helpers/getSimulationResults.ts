import { extractCategoriesObjects } from '@/helpers/publicodes/extractCategoriesObjects'
import { SimulationResults } from '@/types/groups'
import { getCorrectedValue } from '@/utils/getCorrectedValue'

export const getSimulationResults = ({
  rules,
  getRuleObject,
}: {
  rules: any
  getRuleObject: (dottedName: string) => any
}): SimulationResults => {
  const resultsObject: any = {}

  const categories = extractCategoriesObjects(rules, getRuleObject)

  categories.forEach((category: any) => {
    resultsObject[
      category.name === 'transport . empreinte' ? 'transports' : category.name
    ] = (Math.round(((category.nodeValue as number) ?? 0) / 10) / 100).toFixed(
      2
    )
  })

  const evaluation = getRuleObject('bilan')
  const { nodeValue: rawNodeValue, unit } = evaluation
  const valueTotal = getCorrectedValue({ nodeValue: rawNodeValue, unit })

  resultsObject.total = ((valueTotal as number) / 10 / 100).toFixed(2)

  return resultsObject
}
