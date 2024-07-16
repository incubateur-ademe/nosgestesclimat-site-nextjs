import { useInseeCodeParams } from '@/hooks/useInseeCodeParams'
import { useVigieEau } from '@/hooks/useVigieEau'

export default function VigieEau() {
  const { inseeCode } = useInseeCodeParams()

  const { data, isLoading, isError } = useVigieEau({ inseeCode })

  if (!inseeCode || isLoading) {
    return
  }

  if (isError) {
    return <div>Pas de restriction</div>
  }

  console.log(data)

  if (data.statusCode === 404) {
    return <div>Not found</div>
  }

  return <div>{inseeCode}</div>
}
