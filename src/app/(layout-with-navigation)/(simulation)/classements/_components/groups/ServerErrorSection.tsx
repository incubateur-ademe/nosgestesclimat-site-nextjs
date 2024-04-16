'use client'

import Container from '@/design-system/layout/Container'

export default function ServerErrorSection() {
  return (
    <Container className="rounded-xl bg-gray-100 p-4">
      <h2 className="mb-2 mt-0 text-lg font-medium">
        <NGCTrans>Oups ! Une erreur est survenue.</NGCTrans>
      </h2>
      <p className="mb-6 text-sm">
        <NGCTrans>
          Nos équipes ont été prévenues ; veuillez réessayer d'accéder à cette
          page plus tard.
        </NGCTrans>
      </p>
    </Container>
  )
}
