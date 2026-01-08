import type { DefaultPageProps } from '@/types'
import { permanentRedirect } from 'next/navigation'

export default async function RejoindreGroupePage({
  searchParams,
}: DefaultPageProps) {
  const searchParamsObject = await searchParams
  const urlSearchParams = new URLSearchParams(
    searchParamsObject
      ? Object.entries(searchParamsObject).map(([key, value]) => [
          key,
          String(value),
        ])
      : []
  )

  const searchParamsString = urlSearchParams.toString()

  permanentRedirect(
    `/amis/invitation/votre-nom${searchParamsString ? `?${searchParamsString}` : ''}`
  )
}
