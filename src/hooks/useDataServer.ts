import { NGC_MODEL_API_URL } from '@/constants/urls'
import { usePRNumber } from './usePRNumber'

export const useDataServer = () => {
  const { PRNumber } = usePRNumber()
  if (PRNumber) {
    return `https://deploy-preview-${PRNumber}--ecolab-data.netlify.app`
  }

  return process.env.NEXT_PUBLIC_LOCAL_DATA_SERVER ?? NGC_MODEL_API_URL
}
