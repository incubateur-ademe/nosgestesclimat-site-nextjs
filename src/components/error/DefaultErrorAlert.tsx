'use client'

import Alert from '@/design-system/alerts/alert/Alert'
import type { PropsWithChildren } from 'react'
import DefaultErrorMessage from './DefaultErrorMessage'

export default function DefaultErrorAlert({ children }: PropsWithChildren) {
  return (
    <Alert
      type="error"
      className="mb-6"
      description={children ?? <DefaultErrorMessage />}
    />
  )
}
