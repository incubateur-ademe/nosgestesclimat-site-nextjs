import Card from '@/design-system/layout/Card'
import CountryFlag from './CountryFlag'

type Props = {
	code: string
	shouldShowButton: boolean
	label: string
	isSelected: boolean
}

export default function CountryListItem({
	code,
	shouldShowButton,
	label,
	isSelected,
}: Props) {
	return (
		<Card
			tag={shouldShowButton ? 'button' : ''}
			className="flex h-16 w-24 flex-col items-center justify-center gap-2 px-3 py-2 text-center text-xs text-primaryDark sm:h-12 sm:!w-36 sm:flex-row sm:justify-start sm:py-0 sm:text-left"
		>
			<CountryFlag code={code} />
			{label}
		</Card>
	)
}
