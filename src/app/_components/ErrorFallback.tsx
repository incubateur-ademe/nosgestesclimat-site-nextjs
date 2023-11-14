import Logo from '@/components/misc/Logo'
import Trans from '@/components/translation/Trans'
import Button from '@/design-system/inputs/Button'

export const ErrorFallback = () => {
  return (
    <div className="text-center">
      <Logo className="mb-4" />
      <h1>
        <Trans>Une erreur s'est produite</Trans>
      </h1>
      <p className="mb-8">
        <Trans>
          Notre équipe a été notifiée, nous allons résoudre le problème au plus
          vite.
        </Trans>
      </p>
      <Button
        onClick={() => {
          window.location.reload()
        }}>
        <Trans>Recharger la page</Trans>
      </Button>
    </div>
  )
}
