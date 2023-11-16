import { DATA_SERVER_URL } from '@/constants/urls'
import { usePRNumber } from './usePRNumber'

export const useDataServer = () => {
  const { PRNumber } = usePRNumber()
  if (PRNumber) {
    return `https://deploy-preview-${PRNumber}--ecolab-data.netlify.app`
  }

  if (process.env.NEXT_PUBLIC_LOCAL_DATA) return

  return DATA_SERVER_URL
}
