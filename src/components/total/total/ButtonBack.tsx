import ChevronLeft from '@/components/icons/ChevronLeft'
import { getStrokeColor } from '@/helpers/getCategoryColorClass'
import { useForm } from '@/publicodes-state'
import { twMerge } from 'tailwind-merge'

export default function ButtonBack({
  onClick = () => {},
}: {
  onClick?: () => void
}) {
  const { currentCategory } = useForm()
  return (
    <button
      data-cypress-id="back-button"
      className="relative block h-8 w-8 lg:absolute lg:-left-10 lg:top-1/2 lg:h-10 lg:w-10 lg:-translate-x-2 lg:-translate-y-1/2"
      onClick={onClick}>
      <ChevronLeft
        className={twMerge(
          'h-auto w-full transition-transform hover:-translate-x-2',
          getStrokeColor(currentCategory)
        )}
      />
    </button>
  )
}
