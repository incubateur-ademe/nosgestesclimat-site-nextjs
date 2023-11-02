import { usePRNumber } from './usePRNumber'

export const useDataServer = () => {
  const { PRNumber } = usePRNumber()
  if (PRNumber) {
    return `https://deploy-preview-${PRNumber}--ecolab-data.netlify.app`
  }

  const localUrl = process.env.NEXT_PUBLIC_LOCAL_DATA_SERVER
  if (localUrl) {
    return localUrl
  }

  return 'https://data.nosgestesclimat.fr/'
}
