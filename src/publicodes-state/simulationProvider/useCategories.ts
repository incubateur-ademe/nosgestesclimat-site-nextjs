import { useMemo } from 'react'

type Props = {
  engine: any
  safeEvaluate: any
  order: string[] | null
}

export default function useCategories({ engine, safeEvaluate, order }: Props) {
  const missingVariables = useMemo(
    () => Object.keys(safeEvaluate('bilan').missingVariables),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [engine]
  )

  const categories = useMemo(
    () =>
      missingVariables
        .reduce(
          (accumulator: any, currentValue: string) =>
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

  const subcategories = useMemo(
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
                    (rule: any) => currentValue + ' . ' + rule
                  ) || [],
        }),
        {}
      ),
    [engine, categories]
  )

  return { categories, subcategories }
}
