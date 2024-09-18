'use client'

import Modal from '@/design-system/modals/Modal'
import { ReactNode } from 'react'
import ErrorContent from './ErrorContent'

export default function ErrorModal({
  children,
}: {
  children?: ReactNode
  error: Error | null
}) {
  return (
    <Modal isOpen={true} closeModal={() => {}} hasAbortButton={false}>
      {children ?? <ErrorContent />}
    </Modal>
  )
}
