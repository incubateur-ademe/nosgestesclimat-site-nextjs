import { NGC_MODEL_API_URL } from '@/constants/urls'
import useModelVersion from '@/hooks/useModelVersion'
import { usePRNumber } from './usePRNumber'

export const useDataServer = () => {
  const { PRNumber } = usePRNumber()
  const modelVersion = useModelVersion()

  if (PRNumber) {
    const previewURL = `https://deploy-preview-${PRNumber}--ecolab-data.netlify.app`
    console.debug(`[useDataServer] using preview URL: ${previewURL}`)
    return previewURL
  }

  if (process.env.NEXT_PUBLIC_LOCAL_DATA_SERVER) {
    console.debug(
      `[useDataServer] using the local server URL: ${process.env.NEXT_PUBLIC_LOCAL_DATA_SERVER}`
    )
    return process.env.NEXT_PUBLIC_LOCAL_DATA_SERVER
  }

  console.debug(
    `[useDataServer] using the NGC API URL: ${NGC_MODEL_API_URL}/${modelVersion}`
  )
  return `${NGC_MODEL_API_URL}/${modelVersion}`
}
