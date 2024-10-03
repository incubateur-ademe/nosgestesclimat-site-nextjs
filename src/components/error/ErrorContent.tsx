'use client'

import Button from '@/design-system/inputs/Button'
import Trans from '../translation/Trans'

export default function ErrorContent() {
  return (
    <>
      <h2>
        <Trans>Oups ! Une erreur est survenue</Trans> 🐛
      </h2>

      <p>
        <Trans>
          Une erreur s'est produite ; veuillez recharger la page ou réessayer
          plus tard.
        </Trans>
      </p>

      <p>
        <Trans>Si le problème persiste, merci de</Trans>{' '}
        <Button
          color="link"
          onClick={() => window.location.replace('/contact')}>
          <Trans>contacter le support.</Trans>
        </Button>
      </p>

      <div className="mt-10 flex w-full justify-center">
        <Button onClick={() => window.location.replace('/')}>
          <Trans>Revenir à l'accueil</Trans>
        </Button>
      </div>
    </>
  )
}
