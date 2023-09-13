'use client'

import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import Container from '@/design-system/layout/Container'

export default function NoSimulationSection() {
  return (
    <Container className="mt-7 bg-gray-100 p-4">
      <h2 className="mb-2 mt-0 text-lg font-medium">
        <Trans>Créer un groupe</Trans>
      </h2>
      <p className="mb-6 text-sm">
        Pour créer un groupe, vous devez d'abord calculer votre empreinte
        carbone.
      </p>
      <ButtonLink
        href={'/simulateur/bilan'}
        data-cypress-id="button-create-group-no-simulation">
        <Trans>Passer le test</Trans>
      </ButtonLink>
    </Container>
  )
}
