import { fetchSupportedRegions } from '@/helpers/localisation/fetchSupportedRegions'
import { RegionCode, SuppportedRegions } from '@/types/international'
import Image from 'next/image'
import { use } from 'react'

export function getFlagImgSrc(inputCode: RegionCode): string | undefined {
  if (!inputCode) {
    return undefined
  }
  return `https://cdn.jsdelivr.net/npm/svg-country-flags@1.2.10/svg/${inputCode.toLowerCase()}.svg`
}

export function useFlag(inputCode: RegionCode): string | undefined {
  const supportedRegions: SuppportedRegions = use(fetchSupportedRegions)

  const code = (supportedRegions?.fr?.drapeau ?? inputCode) as unknown as string
  return getFlagImgSrc(code)
}

export default function CountryFlag({
  code,
  className,
}: {
  code: string
  className?: string
}) {
  const flagSrc = useFlag(code)

  if (!flagSrc) return null

  return (
    <Image
      src={flagSrc}
      alt=""
      aria-hidden="true"
      className={`mr-1 h-4 w-4 align-sub ${className}`}
      width={16}
      height={16}
    />
  )
}
