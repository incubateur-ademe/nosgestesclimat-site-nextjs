'use client'

import Modal from '@/design-system/modals/Modal'
import ErrorContent from './ErrorContent'

export default function ErrorModal() {
  return (
    <Modal isOpen={true} closeModal={() => {}} hasAbortButton={false}>
      {<ErrorContent />}
    </Modal>
  )
}
