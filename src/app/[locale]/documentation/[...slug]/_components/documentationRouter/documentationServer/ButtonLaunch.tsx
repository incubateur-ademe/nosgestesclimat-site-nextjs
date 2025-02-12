'use client'

import { IsDocumentationClientContext } from '@/app/[locale]/documentation/_contexts/DocumentationStateContext'
import TransServer from '@/components/translation/trans/TransServer'
import Button from '@/design-system/inputs/Button'
import { useContext } from 'react'

export default function ButtonLaunch({ locale }: { locale: string }) {
  const { setIsDocumentationClient } = useContext(IsDocumentationClientContext)

  return (
    <Button
      onClick={() => setIsDocumentationClient(true)}
      data-cypress-id="documentation-launch-button">
      <TransServer locale={locale}>Lancer le calcul</TransServer>
    </Button>
  )
}
