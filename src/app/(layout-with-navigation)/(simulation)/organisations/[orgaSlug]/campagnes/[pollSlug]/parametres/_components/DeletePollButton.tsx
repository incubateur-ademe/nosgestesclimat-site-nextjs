'use client'

import TrashIcon from '@/components/icons/TrashIcon'
import Trans from '@/components/translation/Trans'
import Button from '@/design-system/inputs/Button'
import ConfirmationModal from '@/design-system/modals/ConfirmationModal'
import { useState } from 'react'

export default function DeletePollButton() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Button color="link" onClick={() => setIsOpen(true)}>
        <TrashIcon className="mr-2 w-4 fill-primary-700" />
        <Trans>Supprimer cette campagne</Trans>
      </Button>

      {isOpen && (
        <ConfirmationModal
          closeModal={() => setIsOpen(false)}
          onConfirm={() => {}}>
          <h2>
            <Trans>Supprimer cette campagne ?</Trans>
          </h2>
          <p>
            <Trans>Cette opération est définitive.</Trans>
          </p>
        </ConfirmationModal>
      )}
    </>
  )
}
