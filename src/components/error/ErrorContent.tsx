'use client'

import Button from '@/design-system/inputs/Button'
import TransClient from '../translation/trans/TransClient'

export default function ErrorContent() {
  return (
    <>
      <h2>
        <TransClient>Oups ! Une erreur est survenue</TransClient> 🐛
      </h2>

      <p>
        <TransClient>
          Une erreur s'est produite ; veuillez recharger la page ou réessayer
          plus tard.
        </TransClient>
      </p>

      <p>
        <TransClient>Si le problème persiste, merci de</TransClient>{' '}
        <Button
          color="link"
          onClick={() => window.location.replace('/contact')}>
          <TransClient>contacter le support.</TransClient>
        </Button>
      </p>

      <div className="mt-10 flex w-full justify-center">
        <Button onClick={() => window.location.replace('/')}>
          <TransClient>Revenir à l'accueil</TransClient>
        </Button>
      </div>
    </>
  )
}
