import { useSearchParams } from 'next/navigation'

export function useGetResultsFromDetailParam() {
  const searchParams = useSearchParams()

  const detail = searchParams.get('details')

  if (!detail) return null

  const footprintByCategory = detail.match(/[a-z][0-9]+\.[0-9][0-9]/g)?.reduce(
    (acc, [category, ...rest]) => {
      return {
        ...acc,
        [category === 'b' ? 'd' : category]: 1000 * +rest.join(''),
      }
    },
    {} as Record<string, number>
  )

  if (!footprintByCategory) return null

  footprintByCategory.bilan = Object.keys(footprintByCategory).reduce(
    (acc, key) => {
      return acc + (footprintByCategory[key] || 0)
    },
    0
  )

  return footprintByCategory
}
