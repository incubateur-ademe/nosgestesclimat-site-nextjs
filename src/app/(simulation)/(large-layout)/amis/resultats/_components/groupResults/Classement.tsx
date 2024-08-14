'use client'

import { Group, Participant } from '@/types/groups'
import { useState } from 'react'

import Trans from '@/components/translation/Trans'
import Emoji from '@/design-system/utils/Emoji'

import { formatCarbonFootprint } from '@/helpers/formatters/formatCarbonFootprint'
import { getTopThreeAndRestMembers } from '@/helpers/groups/getTopThreeAndRestMembers'
import { temp_getComputedResults } from '@/helpers/simulation/temp_getComputedResults'
import { useUser } from '@/publicodes-state'
import ClassementMember from './classement/ClassementMember'

export default function Classement({ group }: { group: Group }) {
  const [isExpanded, setIsExpanded] = useState(false)

  const {
    user: { userId },
  } = useUser()

  if (!group) {
    return null
  }

  const { topThreeMembers, restOfMembers } =
    getTopThreeAndRestMembers(group.participants) || {}

  const withS = group.participants.length - 5 > 1 ? 's' : ''

  const hasOneParticipant = group.participants.length === 1

  return (
    <>
      <div className="mt-4">
        <h2 className="m-0 text-lg font-bold">
          <Trans>Le classement</Trans>
        </h2>
      </div>

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

          const { formattedValue, unit } = formatCarbonFootprint(
            temp_getComputedResults(participant?.simulation)?.bilan ?? ''
          )

          console.log(temp_getComputedResults(participant?.simulation))

          const quantity = temp_getComputedResults(participant?.simulation)
            ?.bilan ? (
            <span className="m-none leading-[160%]">
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
              rank={rank || ''}
              quantity={quantity}
              isTopThree
              isCurrentMember={participant.userId === userId}
              group={group}
              userId={participant.userId}
              numberOfParticipants={group.participants.length}
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
                  temp_getComputedResults(participant?.simulation)?.bilan ?? ''
                )

                const quantity = temp_getComputedResults(
                  participant?.simulation
                )?.bilan ? (
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
