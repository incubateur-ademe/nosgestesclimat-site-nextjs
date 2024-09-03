import ChevronLeft from '@/components/icons/ChevronLeft'

export default function ButtonBack({
  onClick = () => {},
}: {
  onClick?: () => void
}) {
  return (
    <button
      className="relative block h-8 w-8 lg:top-1/2 lg:h-10 lg:w-10 lg:-translate-x-2 lg:-translate-y-1/2"
      onClick={onClick}>
      <ChevronLeft className="h-auto w-full transition-transform hover:-translate-x-2" />
    </button>
  )
}
