'use client'

import Button from '@/design-system/inputs/Button'
import { JSX, useContext } from 'react'
import { IsDocumentationClientContext } from '../../_contexts/DocumentationStateContext'
import DocumentationServer from './documentationRouter/DocumentationServer'

type Props = {
  supportedRegions: any
  slug: string[]
  clientDocumentation: JSX.Element
}

export default function DocumentationRouter({
  supportedRegions,
  slug,
  clientDocumentation,
}: Props) {
  const { isDocumentationClient, setIsDocumentationClient } = useContext(
    IsDocumentationClientContext
  )

  if (isDocumentationClient) return clientDocumentation

  return (
    <>
      <DocumentationServer
        supportedRegions={supportedRegions}
        slugs={slug}
        ctaButtonElement={
          <Button onClick={() => setIsDocumentationClient(true)}>
            Lancer le calcul
          </Button>
        }
      />
    </>
  )
}
