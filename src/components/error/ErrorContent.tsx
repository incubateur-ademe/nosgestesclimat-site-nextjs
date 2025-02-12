'use client'

import Button from '@/design-system/inputs/Button'
import { useLocale } from '@/hooks/useLocale'
import Trans from '../translation/Trans'

export default function ErrorContent() {
  const locale = useLocale()
  return (
    <>
      <h2>
        <Trans locale={locale}>Oups ! Une erreur est survenue</Trans> 🐛
      </h2>

      <p>
        <Trans locale={locale}>
          Une erreur s'est produite ; veuillez recharger la page ou réessayer
          plus tard.
        </Trans>
      </p>

      <p>
        <Trans locale={locale}>Si le problème persiste, merci de</Trans>{' '}
        <Button
          color="link"
          onClick={() => window.location.replace('/contact')}>
          <Trans locale={locale}>contacter le support.</Trans>
        </Button>
      </p>

      <div className="mt-10 flex w-full justify-center">
        <Button onClick={() => window.location.replace('/')}>
          <Trans locale={locale}>Revenir à l'accueil</Trans>
        </Button>
      </div>
    </>
  )
}
