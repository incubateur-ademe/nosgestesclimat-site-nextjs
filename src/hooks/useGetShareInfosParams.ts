import { DottedName } from '@/publicodes-state/types'
import { useSearchParams } from 'next/navigation'

export const useGetShareInfosParams = () => {
  const searchParams = useSearchParams()

  const total = Number(searchParams.get('total'))

  const subcategories: { dottedName: DottedName; value: number }[] = [
    {
      dottedName: searchParams.get('c1name') ?? '',
      value: Number(searchParams.get('c1value')),
    },
    {
      dottedName: searchParams.get('c2name') ?? '',
      value: Number(searchParams.get('c2value')),
    },
    {
      dottedName: searchParams.get('c3name') ?? '',
      value: Number(searchParams.get('c3value')),
    },
  ].filter(({ dottedName }) => dottedName.length)

  return { total, subcategories }
}
