'use client'

import TransClient from '@/components/translation/TransClient'
import Container from '@/design-system/layout/Container'

export default function ServerErrorSection() {
  return (
    <Container className="mt-7 bg-gray-100 p-4">
      <h2 className="mb-2 mt-0 text-lg font-medium">
        <TransClient>Oups ! Désolé, une erreur est survenue.</TransClient>
      </h2>
      <p className="mb-6 text-sm">
        <TransClient>
          Nos équipes ont été prévenues ; veuillez réessayer d'accéder à cette
          page plus tard.
        </TransClient>
      </p>
    </Container>
  )
}
