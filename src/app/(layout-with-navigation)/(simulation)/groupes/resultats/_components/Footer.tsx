'use client'

import TransClient from '@/components/translation/TransClient'
import ButtonLink from '@/design-system/inputs/ButtonLink'

export default function Footer() {
  return (
    <footer className="-ml-4 bg-grey-100 p-6 px-8 md:px-6">
      <h2 className="mt-0">
        <TransClient>Comment agir</TransClient>
      </h2>
      <p className="mb-8">
        <TransClient>
          Découvrez nos pistes pour agir dès aujourd’hui pour le climat, ou
          passez le test pour obtenir des recommandations personnalisées.
        </TransClient>
      </p>
      <ButtonLink color="secondary" href="/actions">
        <TransClient>Toutes les actions</TransClient>
      </ButtonLink>
    </footer>
  )
}
