'use client'

import TrashIcon from '@/components/icons/TrashIcon'
import TransClient from '@/components/translation/trans/TransClient'
import Button from '@/design-system/inputs/Button'
import ConfirmationModal from '@/design-system/modals/ConfirmationModal'
import { useDeletePoll } from '@/hooks/organisations/polls/useDeletePoll'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'

export default function DeletePollButton() {
  const [isOpen, setIsOpen] = useState(false)

  const { orgaSlug } = useParams()

  const router = useRouter()

  const { mutateAsync: deletePoll, error } = useDeletePoll()

  async function handleDeletePoll() {
    try {
      await deletePoll()

      router.push(`/organisations/${orgaSlug}`)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Button color="link" onClick={() => setIsOpen(true)}>
        <TrashIcon className="fill-primary-700 mr-2 w-4" />
        <TransClient>Supprimer cette campagne</TransClient>
      </Button>

      {error && (
        <div className="mt-4 text-red-600">
          <TransClient>
            Une erreur est survenue lors de la suppression de la campagne.
          </TransClient>
        </div>
      )}

      {isOpen && (
        <ConfirmationModal
          closeModal={() => setIsOpen(false)}
          onConfirm={handleDeletePoll}>
          <h2>
            <TransClient>Supprimer cette campagne ?</TransClient>
          </h2>
          <p>
            <TransClient>Cette opération est définitive.</TransClient>
          </p>
        </ConfirmationModal>
      )}
    </>
  )
}
