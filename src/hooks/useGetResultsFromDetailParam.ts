import { rehydrateDetail } from '@/helpers/url/rehydrateDetail'
import { useSearchParams } from 'next/navigation'

export function useGetResultsFromDetailParam() {
  const searchParams = useSearchParams()

  const detail = searchParams.get('details')

  if (!detail) return null

  const footprintByCategory = rehydrateDetail(detail)

  if (!footprintByCategory) return null

  footprintByCategory.bilan = Object.keys(footprintByCategory).reduce(
    (acc, key) => {
      return acc + (footprintByCategory[key] || 0)
    },
    0
  )

  return footprintByCategory
}
