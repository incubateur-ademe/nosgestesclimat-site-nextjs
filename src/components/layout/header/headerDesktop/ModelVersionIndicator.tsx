import Link from '@/components/Link'
import {
  DEFAULT_MODEL_VERSION,
  NIGHTLY_MODEL_VERSION,
} from '@/constants/modelAPI'
import { useIframe } from '@/hooks/useIframe'
import useModelVersion, {
  clearModelVersionFromStorage,
} from '@/hooks/useModelVersion'
import { usePRNumber } from '@/hooks/usePRNumber'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function ModelVersionIndicator() {
  const router = useRouter()
  const { iframeRegion } = useIframe()
  const modelVersion = useModelVersion()

  const { PRNumber } = usePRNumber()

  if (PRNumber || modelVersion === DEFAULT_MODEL_VERSION || iframeRegion) {
    return null
  }

  return (
    <div className="flex items-center gap-2 rounded-lg bg-gray-100 p-2 text-center font-bold uppercase text-white ">
      🏷️
      <Link
        className="font-base text-sm text-primary-700"
        target="_blank"
        href={
          'https://github.com/incubateur-ademe/nosgestesclimat/' +
            modelVersion ===
          NIGHTLY_MODEL_VERSION
            ? '/tree/preprod'
            : `/releases/${modelVersion}`
        }>
        {modelVersion}
      </Link>
      <button
        onClick={(event) => {
          event.stopPropagation()
          clearModelVersionFromStorage()
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
