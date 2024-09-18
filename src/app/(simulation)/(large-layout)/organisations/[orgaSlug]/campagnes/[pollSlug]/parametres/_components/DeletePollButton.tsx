'use client'

import TrashIcon from '@/components/icons/TrashIcon'
import Trans from '@/components/translation/Trans'
import Button from '@/design-system/inputs/Button'
import ConfirmationModal from '@/design-system/modals/ConfirmationModal'
import { useDeletePoll } from '@/hooks/organisations/useDeletePoll'
import { useUser } from '@/publicodes-state'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'

export default function DeletePollButton() {
  const [isOpen, setIsOpen] = useState(false)

  const { pollSlug, orgaSlug } = useParams()

  const { user } = useUser()

  const router = useRouter()

  const { mutateAsync: deletePoll, error } = useDeletePoll({
    pollSlug: pollSlug as string,
    orgaSlug: orgaSlug as string,
    email: user?.organisation?.administratorEmail ?? '',
  })

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
        <TrashIcon className="mr-2 w-4 fill-primary-700" />
        <Trans>Supprimer cette campagne</Trans>
      </Button>

      {error && (
        <div className="mt-4 text-red-600">
          <Trans>
            Une erreur est survenue lors de la suppression de la campagne.
          </Trans>
        </div>
      )}

      {isOpen && (
        <ConfirmationModal
          closeModal={() => setIsOpen(false)}
          onConfirm={handleDeletePoll}>
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
