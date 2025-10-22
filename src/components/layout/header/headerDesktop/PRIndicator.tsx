import CloseIcon from '@/components/icons/Close'
import Link from '@/components/Link'
import { useIframeStatic } from '@/hooks/useIframeStatic'
import { usePRNumber } from '@/hooks/usePRNumber'
import { useRouter } from 'next/navigation'

export default function PRIndicator() {
  const router = useRouter()

  const { PRNumber, clearPRNumber } = usePRNumber()

  const { iframeRegion } = useIframeStatic()

  if (!PRNumber || iframeRegion) return null

  return (
    <div className="flex items-center gap-2 rounded-xl bg-gray-100 p-2 text-center font-bold text-white uppercase">
      <Link
        className="font-base text-primary-700 text-sm"
        target="_blank"
        href={
          'https://github.com/incubateur-ademe/nosgestesclimat/pull/' + PRNumber
        }>
        #{PRNumber}
      </Link>
      <button
        onClick={(event) => {
          event.stopPropagation()
          clearPRNumber()
          router.refresh()
        }}>
        <CloseIcon />
      </button>
    </div>
  )
}
