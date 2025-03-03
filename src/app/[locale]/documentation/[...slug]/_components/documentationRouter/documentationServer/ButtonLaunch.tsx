'use client'

import { IsDocumentationClientContext } from '@/app/[locale]/documentation/_contexts/DocumentationStateContext'
import Trans from '@/components/translation/trans/TransServer'
import Button from '@/design-system/inputs/Button'
import { useContext } from 'react'

export default function ButtonLaunch({ locale }: { locale: string }) {
  const { setIsDocumentationClient } = useContext(IsDocumentationClientContext)

  return (
    <Button
      onClick={() => setIsDocumentationClient(true)}
      data-cypress-id="documentation-launch-button">
      <Trans locale={locale}>Lancer le calcul</Trans>
    </Button>
  )
}
