import {
  DEFAULT_MODEL_VERSION,
  MODEL_VERSION_PARAM,
} from '@/constants/modelAPI'
import { useIsClient } from '@/hooks/useIsClient'
import { useSearchParams } from 'next/navigation'

export function clearModelVersionFromStorage() {
  sessionStorage.removeItem(MODEL_VERSION_PARAM)
}

function useModelVersion(): string {
  const isClient = useIsClient()
  const searchParams = useSearchParams()

  if (!isClient) {
    return DEFAULT_MODEL_VERSION
  }

  const modelVersionFromURL = searchParams.get(MODEL_VERSION_PARAM)
  const savedModelVersion = sessionStorage.getItem(MODEL_VERSION_PARAM)

  if (modelVersionFromURL) {
    sessionStorage.setItem(MODEL_VERSION_PARAM, modelVersionFromURL)
    return modelVersionFromURL
  }

  return savedModelVersion ?? DEFAULT_MODEL_VERSION
}

export default useModelVersion
