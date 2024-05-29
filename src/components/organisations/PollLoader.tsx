import Loader from '@/design-system/layout/Loader'

export default function PollLoader() {
  return (
    <div className="py-12 text-center">
      <Loader color="dark" className="mb-8" />
      <p>Nous récupérons les données de la campagne...</p>
    </div>
  )
}
