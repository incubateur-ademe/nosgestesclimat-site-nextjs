'use client'

import { Group, Participant } from '@/types/groups'
import { useState } from 'react'

import Trans from '@/components/translation/Trans'
import Emoji from '@/design-system/utils/Emoji'
import { formatCarbonFootprint } from '@/helpers/formatCarbonFootprint'
import { getTopThreeAndRestMembers } from '@/helpers/groups/getTopThreeAndRestMembers'
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
            participant?.simulation?.computedResults?.bilan ?? ''
          )

          const quantity = participant?.simulation?.computedResults?.bilan ? (
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
            />
          )
        })}
      </ul>

      {restOfMembers.length > 0 && (
        <ul className="px-4 py-4">
          {restOfMembers.length > 0 &&
            restOfMembers
              .filter(
                (member: Participant, index: number) =>
                  isExpanded || index + topThreeMembers?.length < 5
              )
              .map((member: Participant, index: number) => {
                const rank = `${index + 1 + topThreeMembers?.length}.`

                const { formattedValue, unit } = formatCarbonFootprint(
                  member?.simulation?.computedResults?.bilan ?? ''
                )

                const quantity = member?.simulation?.computedResults?.bilan ? (
                  <span className="leading-[160%]">
                    <strong>{formattedValue}</strong>{' '}
                    <span className="text-sm font-light">{unit}</span>
                  </span>
                ) : (
                  '...'
                )

                return (
                  <ClassementMember
                    key={member._id}
                    name={member.name}
                    rank={rank}
                    quantity={quantity}
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
