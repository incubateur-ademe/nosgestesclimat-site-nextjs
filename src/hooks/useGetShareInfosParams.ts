import { getSearchParamsClientSide } from '@/helpers/getSearchParamsClientSide'

export const useGetShareInfosParams = () => {
  const searchParams = getSearchParamsClientSide()

  const carboneTotal = Number(searchParams.get('total'))

  const waterTotal = Number(searchParams.get('watertotal'))

  return { carboneTotal, waterTotal }
}
