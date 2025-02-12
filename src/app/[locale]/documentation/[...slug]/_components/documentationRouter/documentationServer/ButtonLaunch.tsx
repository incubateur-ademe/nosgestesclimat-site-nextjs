'use client'

import { IsDocumentationClientContext } from '@/app/documentation/_contexts/DocumentationStateContext'
import Trans from '@/components/translation/Trans'
import Button from '@/design-system/inputs/Button'
import { useContext } from 'react'

export default function ButtonLaunch() {
  const { setIsDocumentationClient } = useContext(IsDocumentationClientContext)

  return (
    <Button
      onClick={() => setIsDocumentationClient(true)}
      data-cypress-id="documentation-launch-button">
      <Trans>Lancer le calcul</Trans>
    </Button>
  )
}
