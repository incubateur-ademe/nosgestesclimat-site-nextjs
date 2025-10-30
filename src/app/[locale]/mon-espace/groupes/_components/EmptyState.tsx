'use client'

import Trans from '@/components/translation/trans/TransClient'
import ButtonLink from '@/design-system/buttons/ButtonLink'
import Card from '@/design-system/layout/Card'
import { linkToGroupCreation } from '@/constants/group'

export default function EmptyState() {
  return (
    <div className="mt-6 grid gap-8 md:grid-cols-[1fr_360px]">
      <section>
        <h2 className="mb-4 text-2xl font-bold">
          <Trans>
            Invitez votre entourage à calculer leur empreinte
          </Trans>
        </h2>
        <p className="mb-6 text-gray-600">
          <Trans>
            Diffusez un lien collectif pour faire passer le test à vos amis ou
            votre famille, ou sensibilisez les membres de votre organisation.
          </Trans>
        </p>
        <p className="mb-8 text-sm text-gray-500">
          <Trans>Gratuit, 100 % anonyme et surtout sans jugement ni comparaison.</Trans>
        </p>
        <ButtonLink href={linkToGroupCreation}>
          <Trans>Commencer</Trans>
        </ButtonLink>
      </section>

      <aside className="grid gap-6">
        <Card as="a" href="/organisations/connexion" className="p-6">
          <div className="text-lg font-semibold">
            <Trans>Sensibiliser mon organisation</Trans>
          </div>
        </Card>
        <Card as="a" href={linkToGroupCreation} className="p-6">
          <div className="text-lg font-semibold">
            <Trans>Défier mes amis</Trans>
          </div>
        </Card>
        <Card as="a" href={linkToGroupCreation} className="p-6">
          <div className="text-lg font-semibold">
            <Trans>Challenger ma famille</Trans>
          </div>
        </Card>
      </aside>
    </div>
  )
}


