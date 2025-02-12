'use client'

import Trans from '@/components/translation/Trans'
import Container from '@/design-system/layout/Container'

export default function ServerErrorSection() {
  return (
    <Container className="rounded-xl bg-gray-100 p-4">
      <h2 className="mt-0 mb-2 text-lg font-medium">
        <Trans locale={locale}>Oups ! Une erreur est survenue.</Trans>
      </h2>
      <p className="mb-6 text-sm">
        <Trans locale={locale}>
          Nos équipes ont été prévenues ; veuillez réessayer d'accéder à cette
          page plus tard.
        </Trans>
      </p>
    </Container>
  )
}
