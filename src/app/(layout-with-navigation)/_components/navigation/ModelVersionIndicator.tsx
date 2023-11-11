import Link from '@/components/Link'
import {
  DEFAULT_MODEL_VERSION,
  NIGHTLY_MODEL_VERSION,
} from '@/constants/modelAPI'
import { useIframe } from '@/hooks/useIframe'
import useModelVersion, {
  clearModelVersionFromStorage,
} from '@/hooks/useModelVersion'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function () {
  const router = useRouter()
  const { iframeRegion } = useIframe()
  const modelVersion = useModelVersion()

  if (modelVersion === DEFAULT_MODEL_VERSION || iframeRegion) {
    return null
  }

  return (
    <div className="mx-auto mb-4 hidden gap-2 rounded-lg bg-gray-100 px-4 py-2 text-center font-bold uppercase text-white lg:flex ">
      🏷️
      <Link
        className="font-base text-xs text-primary-700 md:text-sm"
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
