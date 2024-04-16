import Logo from '@/components/misc/Logo'
import Button from '@/design-system/inputs/Button'

export const ErrorFallback = () => {
  return (
    <div className="text-center">
      <Logo className="mb-4" />
      <h1>
        <NGCTrans>Une erreur s'est produite</NGCTrans>
      </h1>
      <p className="mb-8">
        <NGCTrans>
          Notre équipe a été notifiée, nous allons résoudre le problème au plus
          vite.
        </NGCTrans>
      </p>
      <Button
        onClick={() => {
          window.location.reload()
        }}>
        <NGCTrans>Recharger la page</NGCTrans>
      </Button>
    </div>
  )
}
