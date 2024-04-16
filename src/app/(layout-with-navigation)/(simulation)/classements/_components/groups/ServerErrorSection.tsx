'use client'

import Trans from '@/components/translation/Trans'
import Container from '@/design-system/layout/Container'

export default function ServerErrorSection() {
  return (
    <Container className="rounded-xl bg-gray-100 p-4">
      <h2 className="mb-2 mt-0 text-lg font-medium">
        <Trans>Oups ! Une erreur est survenue.</Trans>
      </h2>
      <p className="mb-6 text-sm">
        <Trans>
          Nos équipes ont été prévenues ; veuillez réessayer d'accéder à cette
          page plus tard.
        </Trans>
      </p>
    </Container>
  )
}
