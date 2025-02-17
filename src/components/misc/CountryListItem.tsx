import CountryFlag from '@/components/misc/CountryFlag'
import Card from '@/design-system/layout/Card'

type Props = {
  code: string
  shouldShowButton: boolean
  label: string
  isSelected: boolean
  updateCurrentRegion?: (code: string) => void
}

export default function CountryListItem({
  code,
  label,
  isSelected,
  updateCurrentRegion,
}: Props) {
  return (
    <Card
      tag={updateCurrentRegion ? 'button' : ''}
      className={`flex h-16 w-24 items-center justify-center gap-2 bg-primary-100 px-3 py-2 text-center text-xs text-default shadow-none sm:h-12 sm:!w-36 sm:flex-row sm:justify-start sm:py-0 sm:text-left ${
        isSelected ? 'border-primary !bg-primary-100' : ''
      }`}
      onClick={
        updateCurrentRegion ? () => updateCurrentRegion(code) : undefined
      }>
      <CountryFlag code={code} />
      {label}
    </Card>
  )
}
