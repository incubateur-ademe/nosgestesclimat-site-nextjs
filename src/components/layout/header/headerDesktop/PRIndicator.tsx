import Link from '@/components/Link'
import { useIframe } from '@/hooks/useIframe'
import { usePRNumber } from '@/hooks/usePRNumber'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function PRIndicator() {
  const router = useRouter()

  const { PRNumber, clearPRNumber } = usePRNumber()

  const { iframeRegion } = useIframe()

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
        <Image
          className="w-4"
          src="/images/misc/close-plain.svg"
          alt=""
          width="1"
          height="1"
        />
      </button>
    </div>
  )
}
