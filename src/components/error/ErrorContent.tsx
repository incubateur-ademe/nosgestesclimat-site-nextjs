'use client'

import Button from '@/design-system/buttons/Button'
import InlineLink from '@/design-system/inputs/InlineLink'
import Trans from '../translation/trans/TransClient'

export default function ErrorContent() {
  return (
    <div className="px-3 md:px-0">
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
        <InlineLink
          href="/contact"
          className="inline!"
          onClick={() => window.location.replace('/contact')}>
          <Trans>contacter le support.</Trans>
        </InlineLink>
      </p>

      <div className="mt-10 flex w-full justify-center">
        <Button onClick={() => window.location.replace('/')}>
          <Trans>Revenir à l'accueil</Trans>
        </Button>
      </div>
    </div>
  )
}
