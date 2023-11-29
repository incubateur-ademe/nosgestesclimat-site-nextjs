'use client'

import { IsDocumentationClientContext } from '@/app/documentation/_contexts/DocumentationStateContext'
import Button from '@/design-system/inputs/Button'
import { useContext } from 'react'

export default function ButtonLaunch() {
  const { setIsDocumentationClient } = useContext(IsDocumentationClientContext)

  return (
    <Button onClick={() => setIsDocumentationClient(true)}>
      Lancer le calcul
    </Button>
  )
}
