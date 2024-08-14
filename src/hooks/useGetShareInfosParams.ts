import { DottedName } from '@incubateur-ademe/nosgestesclimat'
import { useSearchParams } from 'next/navigation'

export const useGetShareInfosParams = () => {
  const searchParams = useSearchParams()

  const total = Number(searchParams.get('total'))

  const subcategories: { dottedName: DottedName; value: number }[] = [
    {
      dottedName: (searchParams.get('c1name') ?? '') as DottedName,
      value: Number(searchParams.get('c1value')),
    },
    {
      dottedName: (searchParams.get('c2name') ?? '') as DottedName,
      value: Number(searchParams.get('c2value')),
    },
    {
      dottedName: (searchParams.get('c3name') ?? '') as DottedName,
      value: Number(searchParams.get('c3value')),
    },
  ].filter(({ dottedName }) => dottedName.length)

  return { total, subcategories }
}
