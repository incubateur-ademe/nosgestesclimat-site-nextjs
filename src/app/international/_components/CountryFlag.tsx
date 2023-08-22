import { RegionCode } from '@/types/international'
import Image from 'next/image'
import { use } from 'react'
import { fetchSupportedRegions } from '../_helpers/fetchSupportedRegions'

export function getFlagImgSrc(
	inputCode: RegionCode | undefined
): string | undefined {
	if (!inputCode) {
		return undefined
	}
	return `https://cdn.jsdelivr.net/npm/svg-country-flags@1.2.10/svg/${inputCode.toLowerCase()}.svg`
}

export function useFlag(inputCode: RegionCode | undefined): string | undefined {
	const supportedRegions = use(fetchSupportedRegions)

	const code = supportedRegions?.fr?.drapeau ?? inputCode
	return getFlagImgSrc(code)
}

export default function CountryFlag({ code }: { code: string }) {
	const flagSrc = useFlag(code as RegionCode)

	if (!flagSrc) return null

	return (
		<Image
			src={flagSrc}
			alt=""
			aria-hidden="true"
			className="mr-1 h-4 w-4 align-sub"
			width={16}
			height={16}
		/>
	)
}
