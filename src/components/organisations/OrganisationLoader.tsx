import Loader from '@/design-system/layout/Loader'
import Trans from '../translation/Trans'

export default function OrganisationLoader() {
  return (
    <div className="py-12 text-center">
      <Loader color="dark" className="mb-8" />
      <p>
        <Trans>Nous récupérons les données de votre organisation...</Trans>
      </p>
    </div>
  )
}
