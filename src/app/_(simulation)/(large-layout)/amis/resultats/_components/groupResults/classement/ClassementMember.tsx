'use client'

import TrashIcon from '@/components/icons/TrashIcon'
import Trans from '@/components/translation/Trans'
import Badge from '@/design-system/layout/Badge'
import ConfirmationModal from '@/design-system/modals/ConfirmationModal'
import { useIsGroupOwner } from '@/hooks/groups/useIsGroupOwner'
import { useRemoveParticipant } from '@/hooks/groups/useRemoveParticipant'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { Group } from '@/types/groups'
import { captureException } from '@sentry/nextjs'
import { QueryObserverResult } from '@tanstack/react-query'
import { JSX, useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { twMerge } from 'tailwind-merge'

export default function ClassementMember({
  rank,
  quantity,
  isTopThree,
  isCurrentMember,
  group,
  name,
  userId,
  numberOfParticipants,
  refetchGroup,
}: {
  rank: JSX.Element | string
  name: string
  quantity: JSX.Element | string
  isTopThree?: boolean
  isCurrentMember?: boolean
  group: Group
  userId: string
  numberOfParticipants?: number
  refetchGroup: () => Promise<QueryObserverResult<Group, Error>>
}) {
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false)

  const { t } = useClientTranslation()

  const { isGroupOwner } = useIsGroupOwner({ group })

  const { mutateAsync: removePartipant } = useRemoveParticipant()

  async function handleDelete() {
    if (!group) return

    try {
      await removePartipant({
        groupId: group?._id,
        userId: userId || '',
      })

      await refetchGroup()

      setIsConfirmationModalOpen(false)

      toast.success(t('Participant supprimé avec succès'))
    } catch (error) {
      toast.error(t('Une erreur est survenue'), {
        autoClose: false,
      })
      captureException(error)
    }
  }

  return (
    <li className="flex items-center justify-between gap-2">
      <div className="flex flex-1 items-center justify-between">
        <div className="mb-0 flex items-center text-sm md:text-base">
          <span
            className={`mr-2 ${
              isTopThree ? 'text-lg md:text-2xl' : 'ml-1 text-base md:text-lg'
            }`}>
            {rank}
          </span>

          {name}

          {isCurrentMember && (
            <Badge className="ml-2 inline rounded-xl border-pink-100 bg-pink-200 text-xs font-bold text-secondary-700">
              <Trans>Vous</Trans>
            </Badge>
          )}
        </div>

        <div>{quantity}</div>
      </div>

      {isGroupOwner &&
        (isCurrentMember ? (
          // Add a gap to keep the layout consistent
          <div
            className={
              numberOfParticipants === undefined || numberOfParticipants > 1
                ? 'w-6'
                : ''
            }
          />
        ) : (
          <>
            <button
              onClick={() => setIsConfirmationModalOpen(true)}
              className="inline-flex h-6 w-6 items-center justify-center !p-0 transition-colors"
              aria-label={t('{{name}}, supprimer cette participation', {
                name,
              })}>
              <TrashIcon
                className={twMerge(
                  'w-4 fill-default',
                  isTopThree ? 'fill-white hover:fill-primary-200' : ''
                )}
              />
            </button>

            {isConfirmationModalOpen && (
              <ConfirmationModal
                onConfirm={handleDelete}
                closeModal={() => setIsConfirmationModalOpen(false)}>
                <p className="text-sm md:text-base">
                  <Trans>
                    Supprimer ce participant ? Cette opération est définitive.
                  </Trans>
                </p>
              </ConfirmationModal>
            )}
          </>
        ))}
    </li>
  )
}
