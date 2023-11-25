import {
  DATA_SERVER_URL,
  NGC_MODEL_API_URL,
  getModelPRUrl,
} from '@/constants/urls'
import useModelVersion from '@/hooks/useModelVersion'
import { usePRNumber } from './usePRNumber'

export const useDataServer = () => {
  const { PRNumber } = usePRNumber()
  const modelVersion = useModelVersion()

  if (PRNumber) {
    const previewURL = getModelPRUrl(PRNumber)
    console.debug(`[useDataServer] using preview URL: ${previewURL}`)
    return previewURL
  }

  return `${NGC_MODEL_API_URL}/${modelVersion}`
  if (process.env.NEXT_PUBLIC_LOCAL_DATA) return

  return DATA_SERVER_URL
}
