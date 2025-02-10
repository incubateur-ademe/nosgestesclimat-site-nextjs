import ChevronLeft from '@/components/icons/ChevronLeft'

export default function ButtonBack({
  onClick = () => {},
}: {
  onClick?: () => void
}) {
  return (
    <button
      data-cypress-id="back-button"
      className="relative block h-8 w-8"
      onClick={onClick}>
      <ChevronLeft className="h-auto w-full stroke-primary-700 transition-transform hover:-translate-x-2" />
    </button>
  )
}
