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
    <div className="mx-auto mb-4 hidden gap-2 rounded-lg bg-gray-100 px-4 py-2 text-center font-bold uppercase text-white lg:flex ">
      <Image
        src="/images/misc/E045.svg"
        alt=""
        className="w-8"
        aria-hidden="true"
        width="20"
        height="20"
      />
      <Link
        className="font-base text-sm text-primaryDark md:text-lg"
        target="_blank"
        href={'https://github.com/datagir/nosgestesclimat/pull/' + PRNumber}>
        #{PRNumber}
      </Link>
      <button
        onClick={(event) => {
          event.stopPropagation()
          clearPRNumber()
          router.refresh()
        }}>
        <Image
          className="w-6"
          src="/images/misc/close-plain.svg"
          alt=""
          width="1"
          height="1"
        />
      </button>
    </div>
  )
}
