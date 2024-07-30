import ChevronLeft from '@/components/icons/ChevronLeft'
import Link from '@/components/Link'

export default function ButtonBack() {
  return (
    <Link
      href="/"
      className="relative block h-10 w-10 lg:absolute lg:right-full lg:top-1/2 lg:-translate-x-2 lg:-translate-y-1/2">
      <ChevronLeft className="h-auto w-full transition-transform hover:-translate-x-2" />
    </Link>
  )
}
