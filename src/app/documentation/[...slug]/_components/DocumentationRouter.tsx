'use client'

import Button from '@/design-system/inputs/Button'
import { JSX, useContext } from 'react'
import { IsDocumentationClientContext } from '../../_contexts/DocumentationStateContext'

type Props = {
  serverDocumentation: JSX.Element
  clientDocumentation: JSX.Element
}

export default function DocumentationRouter({
  serverDocumentation,
  clientDocumentation,
}: Props) {
  const { isDocumentationClient, setIsDocumentationClient } = useContext(
    IsDocumentationClientContext
  )

  if (isDocumentationClient) return clientDocumentation

  return (
    <>
      {serverDocumentation}
      <Button onClick={() => setIsDocumentationClient(true)}>
        Lancer le calcul
      </Button>
    </>
  )
}
