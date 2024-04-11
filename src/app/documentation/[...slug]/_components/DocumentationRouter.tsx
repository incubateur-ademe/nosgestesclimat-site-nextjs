'use client'

import Providers from '@/components/providers/Providers'
import { useCurrentSimulation } from '@/publicodes-state'
import { JSX, useContext, useEffect } from 'react'
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

  const { foldedSteps } = useCurrentSimulation()

  // Switch to client side documentation if the simulation has been started
  useEffect(() => {
    if (!foldedSteps) return

    if (foldedSteps?.length > 0) {
      setIsDocumentationClient(true)
    }
  }, [foldedSteps, setIsDocumentationClient])

  if (isDocumentationClient)
    return (
      <Providers supportedRegions={supportedRegions} isOptim={false}>
        <DocumentationClient supportedRegions={supportedRegions} slugs={slug} />
      </Providers>
    )

  return serverComponent
}
