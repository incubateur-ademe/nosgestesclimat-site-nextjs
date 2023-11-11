import { NGC_MODEL_API_URL } from '@/constants/urls'
import useModelVersion from '@/hooks/useModelVersion'

export default function () {
  const modelVersion = useModelVersion()
  return `${NGC_MODEL_API_URL}/${modelVersion}`
}
