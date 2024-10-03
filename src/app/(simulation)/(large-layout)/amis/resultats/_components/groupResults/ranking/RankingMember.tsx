'use client'

import TrashIcon from '@/components/icons/TrashIcon'
import Trans from '@/components/translation/Trans'
import { carboneMetric } from '@/constants/metric'
import Badge from '@/design-system/layout/Badge'
import ConfirmationModal from '@/design-system/modals/ConfirmationModal'
import Emoji from '@/design-system/utils/Emoji'
import { formatFootprint } from '@/helpers/formatters/formatFootprint'
import { useIsGroupOwner } from '@/hooks/groups/useIsGroupOwner'
import { useRemoveParticipant } from '@/hooks/groups/useRemoveParticipant'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { Group, Participant } from '@/types/groups'
import { Metrics } from '@incubateur-ademe/nosgestesclimat'
import { captureException } from '@sentry/nextjs'
import { QueryObserverResult } from '@tanstack/react-query'
import isMobile from 'is-mobile'
import { useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { twMerge } from 'tailwind-merge'

const getRank = (index: number) => {
  switch (index) {
    case 0:
      return <Emoji>🥇</Emoji>
    case 1:
      return <Emoji>🥈</Emoji>
    case 2:
      return <Emoji>🥉</Emoji>
    default:
      return `${index + 1}.`
  }
}

export default function RankingMember({
  participant,
  index,
  isTopThree,
  isCurrentMember,
  group,
  numberOfParticipants,
  refetchGroup,
  textColor,
  metric,
}: {
  isTopThree?: boolean
  index: number
  isCurrentMember?: boolean
  group: Group
  numberOfParticipants?: number
  refetchGroup: () => Promise<QueryObserverResult<Group, Error>>
  textColor?: string
  participant: Participant
  metric: Metrics
}) {
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false)

  const { t } = useClientTranslation()

  const shouldUseAbbreviation = isMobile()

  const { isGroupOwner } = useIsGroupOwner({ group })

  const { mutateAsync: removePartipant } = useRemoveParticipant()

  const { formattedValue, unit } = formatFootprint(
    participant?.simulation?.computedResults?.[metric]?.bilan ?? '',
    {
      metric,
      shouldUseAbbreviation,
    }
  )

  const suffix = metric === carboneMetric ? t('CO₂e / an') : t('/ jour')

  const quantity =
    participant.simulation.progression !== 1 ? (
      <span className="text-sm text-gray-600">
        <Trans>En cours</Trans>
      </span>
    ) : participant?.simulation?.computedResults?.[metric]?.bilan ? (
      <span className="m-none leading-[160%]">
        <strong>{formattedValue}</strong>{' '}
        <span className="text-sm font-light">
          {unit} {suffix}
        </span>
      </span>
    ) : (
      '...'
    )

  async function handleDelete() {
    if (!group) return

    try {
      await removePartipant({
        groupId: group?._id,
        userId: participant.userId || '',
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
            className={twMerge(
              'mr-2',
              isTopThree ? 'text-lg md:text-2xl' : 'ml-1 text-base md:text-lg',
              textColor ?? ''
            )}>
            {participant.simulation.progression !== 1
              ? // Display a placeholder
                '--'
              : getRank(index)}
          </span>

          <span className={textColor}>{participant.name}</span>

          {isCurrentMember && (
            <Badge className="ml-2 inline rounded-xl border-pink-100 bg-pink-200 text-xs font-bold text-secondary-700">
              <Trans>Vous</Trans>
            </Badge>
          )}
        </div>

        <div className={textColor}>{quantity}</div>
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
              className={twMerge(
                'inline-flex h-6 w-6 items-center justify-center !p-0 transition-colors',
                textColor
              )}
              aria-label={t('{{name}}, supprimer cette participation', {
                name,
              })}>
              <TrashIcon
                className={twMerge(
                  'w-4 fill-default',
                  textColor === 'text-white' ? 'fill-white' : 'fill-default'
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
