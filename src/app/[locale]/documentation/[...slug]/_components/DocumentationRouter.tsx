'use client'

import EngineProviders from '@/components/providers/EngineProviders'
import { useCurrentSimulation } from '@/publicodes-state'
import type { JSX } from 'react'
import { useContext, useEffect } from 'react'
import { IsDocumentationClientContext } from '../../_contexts/DocumentationStateContext'
import DocumentationClient from './documentationRouter/DocumentationClient'

type Props = {
  supportedRegions: any
  slug: string[]
  serverComponent: JSX.Element
}

export default function DocumentationRouter({
  supportedRegions,
  slug,
  serverComponent,
}: Props) {
  const { isDocumentationClient, setIsDocumentationClient } = useContext(
    IsDocumentationClientContext
  )

  const { progression } = useCurrentSimulation()

  // Switch to client side documentation if the simulation has been started
  useEffect(() => {
    if (!progression) return

    if (progression > 0) {
      setIsDocumentationClient(true)
    }
  }, [progression, setIsDocumentationClient])

  if (isDocumentationClient)
    return (
      <EngineProviders supportedRegions={supportedRegions} isOptim={false}>
        <DocumentationClient slugs={slug} />
      </EngineProviders>
    )

  return serverComponent
}
