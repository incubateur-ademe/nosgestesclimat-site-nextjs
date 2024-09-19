'use client'

import Trans from '@/components/translation/Trans'
import { defaultMetric } from '@/constants/metric'
import Emoji from '@/design-system/utils/Emoji'
import { formatCarbonFootprint } from '@/helpers/formatters/formatCarbonFootprint'
import { formatFootprint } from '@/helpers/formatters/formatFootprint'
import { getTopThreeAndRestMembers } from '@/helpers/groups/getTopThreeAndRestMembers'
import { useUser } from '@/publicodes-state'
import { Group, Participant } from '@/types/groups'
import { QueryObserverResult } from '@tanstack/react-query'
import { useState } from 'react'
import ClassementMember from './RankingMember'

export default function CarbonRanking({
  group,
  refetchGroup,
}: {
  group: Group
  refetchGroup: () => Promise<QueryObserverResult<Group, Error>>
}) {
  const [isExpanded, setIsExpanded] = useState(false)

  const {
    user: { userId },
  } = useUser()

  const { topThreeMembers, restOfMembers } =
    getTopThreeAndRestMembers(group.participants) || {}

  const withS = group.participants.length - 5 > 1 ? 's' : ''

  const hasOneParticipant = group.participants.length === 1

  return (
    <>
      <ul
        className={`mt-2 rounded-xl  px-3 py-4  ${hasOneParticipant ? 'bg-primary-50 text-primary-700' : 'bg-primary-700 text-white'}`}>
        {topThreeMembers.map((participant: Participant, index: number) => {
          let rank
          switch (index) {
            case 0:
              rank = <Emoji>🥇</Emoji>
              break
            case 1:
              rank = <Emoji>🥈</Emoji>
              break
            case 2:
              rank = <Emoji>🥉</Emoji>
              break
            default:
          }

          const { formattedValue, unit } = formatFootprint(
            participant?.simulation?.computedResults?.[defaultMetric]?.bilan ??
              ''
          )

          const quantity = participant?.simulation?.computedResults?.[
            defaultMetric
          ]?.bilan ? (
            <span className="m-none leading-[160%]">
              <strong>{formattedValue}</strong>{' '}
              <span className="text-sm font-light">
                {unit} <Trans>de CO₂e</Trans>
              </span>
            </span>
          ) : (
            '...'
          )

          return (
            <ClassementMember
              key={participant._id}
              name={participant.name}
              rank={rank || ''}
              quantity={quantity}
              isTopThree
              isCurrentMember={participant.userId === userId}
              group={group}
              userId={participant.userId}
              numberOfParticipants={group.participants.length}
              refetchGroup={refetchGroup}
            />
          )
        })}
      </ul>

      {restOfMembers.length > 0 && (
        <ul className="px-3 py-4">
          {restOfMembers.length > 0 &&
            restOfMembers
              .filter(
                (participant: Participant, index: number) =>
                  isExpanded || index + topThreeMembers?.length < 5
              )
              .map((participant: Participant, index: number) => {
                const rank = `${index + 1 + topThreeMembers?.length}.`

                const { formattedValue, unit } = formatCarbonFootprint(
                  participant?.simulation?.computedResults?.[defaultMetric]
                    ?.bilan
                )

                const quantity = participant?.simulation?.computedResults?.[
                  defaultMetric
                ]?.bilan ? (
                  <span className="leading-[160%]">
                    <strong>{formattedValue}</strong>{' '}
                    <span className="text-sm font-light">{unit}</span>
                  </span>
                ) : (
                  '...'
                )

                return (
                  <ClassementMember
                    key={participant._id}
                    name={participant.name}
                    rank={rank}
                    quantity={quantity}
                    isCurrentMember={participant.userId === userId}
                    group={group}
                    userId={participant.userId}
                    refetchGroup={refetchGroup}
                  />
                )
              })}
        </ul>
      )}

      {group.participants.length > 5 && !isExpanded && (
        <button
          onClick={() => setIsExpanded(true)}
          className="bg-Transparent mt-4 w-full border-none text-center text-sm text-primary-700 underline">
          <Trans>
            Voir les {String(group.participants.length - 5)} autre{withS}{' '}
            participant
            {withS}
          </Trans>
        </button>
      )}
    </>
  )
}
