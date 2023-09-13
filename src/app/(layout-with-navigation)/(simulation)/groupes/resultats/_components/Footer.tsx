'use client'

import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'

export default function Footer() {
  return (
    <section className="rounded-md bg-grey-100 p-6 px-8 md:px-6">
      <h2 className="mt-0">
        <Trans>Comment agir</Trans>
      </h2>
      <p className="mb-8">
        <Trans>
          Découvrez nos pistes pour agir dès aujourd’hui pour le climat, ou
          passez le test pour obtenir des recommandations personnalisées.
        </Trans>
      </p>
      <ButtonLink color="secondary" href="/actions">
        <Trans>Toutes les actions</Trans>
      </ButtonLink>
    </section>
  )
}
