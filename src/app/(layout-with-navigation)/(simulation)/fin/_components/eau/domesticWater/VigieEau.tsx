import { useVigieEau } from '@/hooks/useVigieEau'
// @ts-expect-error There is no types for this package
import France from '@socialgouv/react-departements'

export default function VigieEau() {
  const { departements } = useVigieEau()

  const departementsCodes = departements.map((departement) => departement.code)

  return (
    <France
      departements={departementsCodes}
      color="transparent"
      highlightColor="#d40d83"
    />
  )
}
