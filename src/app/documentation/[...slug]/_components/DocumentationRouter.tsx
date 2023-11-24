'use client'

import Button from '@/design-system/inputs/Button'
import { useLocale } from '@/hooks/useLocale'
import { useUser } from '@/publicodes-state'
import { JSX, useContext, useEffect } from 'react'
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

  const locale = useLocale()

  const { getCurrentSimulation } = useUser()

  const currentSimulation = getCurrentSimulation()

  useEffect(() => {
    if (!currentSimulation?.foldedSteps) return

    if (currentSimulation?.foldedSteps?.length > 0) {
      setIsDocumentationClient(true)
    }
  }, [currentSimulation, setIsDocumentationClient])

  if (isDocumentationClient) return clientDocumentation

  return (
    <>
      <DocumentationServer
        supportedRegions={supportedRegions}
        slugs={slug}
        locale={locale}
        ctaButtonElement={
          <Button onClick={() => setIsDocumentationClient(true)}>
            Lancer le calcul
          </Button>
        }
      />
    </>
  )
}
