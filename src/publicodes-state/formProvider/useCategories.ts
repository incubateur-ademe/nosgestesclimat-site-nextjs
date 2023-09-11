import { useMemo } from 'react'
import { Engine, NGCEvaluatedNode } from '../types'

type Props = {
  engine: Engine
  root: string
  safeEvaluate: (rule: string) => NGCEvaluatedNode | null
  order: string[] | null
}

export default function useCategories({
  engine,
  root,
  safeEvaluate,
  order,
}: Props) {
  const missingVariables = useMemo<string[]>(
    () => Object.keys(safeEvaluate(root)?.missingVariables || {}),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [engine]
  )

  const categories = useMemo<string[]>(
    () =>
      missingVariables
        .reduce(
          (accumulator: string[], currentValue: string) =>
            accumulator.includes(currentValue.split(' . ')[0])
              ? accumulator
              : [...accumulator, currentValue.split(' . ')[0]],
          []
        )
        .sort((a: string, b: string) =>
          !order ? 0 : order.indexOf(a) > order.indexOf(b) ? 1 : -1
        ),
    [missingVariables, order]
  )

  const subcategories = useMemo<{ [key: string]: string[] }>(
    () =>
      categories.reduce(
        (accumulator: object, currentValue: string) => ({
          ...accumulator,
          [currentValue]:
            currentValue === 'services sociétaux'
              ? []
              : engine
                  .getRule(
                    currentValue === 'logement'
                      ? 'logement . impact' // Model shenanigans
                      : currentValue === 'transport'
                      ? 'transport . empreinte'
                      : currentValue
                  )
                  ?.rawNode?.formule?.somme?.map(
                    (rule: string) => currentValue + ' . ' + rule
                  ) || [],
        }),
        {}
      ),
    [engine, categories]
  )

  return { categories, subcategories }
}
