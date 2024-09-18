import { useSearchParams } from 'next/navigation'

export const useGetShareInfosParams = () => {
  const searchParams = useSearchParams()

  const carboneTotal = Number(searchParams.get('total'))

  const waterTotal = Number(searchParams.get('watertotal'))

  return { carboneTotal, waterTotal }
}
