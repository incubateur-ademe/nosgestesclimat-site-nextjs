import { useSearchParams } from 'next/navigation'

export const useDataServer = () => {
  const searchParams = useSearchParams()

  const PR = searchParams.get('PR')

  if (PR) {
    return `https://deploy-preview-${PR}--ecolab-data.netlify.app`
  }

  const localUrl = process.env.NEXT_PUBLIC_LOCAL_DATA_SERVER

  return localUrl ?? 'https://deploy-preview-2085--ecolab-data.netlify.app'
}
