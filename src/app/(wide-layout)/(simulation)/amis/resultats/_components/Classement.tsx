'use client'

import { Group } from '@/types/groups'
import { formatValue } from 'publicodes'
import { useState } from 'react'

import Trans from '@/components/translation/Trans'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useUser } from '@/publicodes-state'
import { getTopThreeAndRestMembers } from '../_utils/getTopThreeAndRestMembers'
import ClassementMember from './ClassementMember'

export default function Classement({ group }: { group: Group }) {
  const [isExpanded, setIsExpanded] = useState(false)

  const {
    user: { id: userId },
  } = useUser()

  const language = useClientTranslation().i18n.language

  if (!group) {
    return null
  }

  const { topThreeMembers, restOfMembers } =
    getTopThreeAndRestMembers(group.members) || {}

  const withS = group.members.length - 5 > 1 ? 's' : ''

  return (
    <>
      <ul className="bg-primary-500 mt-2 rounded-md px-3 py-4 text-white">
        {topThreeMembers.map((member, index) => {
          let rank
          switch (index) {
            case 0:
              rank = '🥇'
              break
            case 1:
              rank = '🥈'
              break
            case 2:
              rank = '🥉'
              break
            default:
          }

          const quantity = member?.results?.total ? (
            <span className="m-none leading-[160%]">
              <strong>
                {formatValue(parseFloat(member?.results?.total), {
                  language,
                })}
              </strong>{' '}
              <span className="text-sm font-light">
                <Trans>tonnes</Trans>
              </span>
            </span>
          ) : (
            '...'
          )

          return (
            <ClassementMember
              key={member._id}
              name={member.name}
              rank={rank || ''}
              quantity={quantity}
              isTopThree
              isCurrentMember={member.userId === userId}
            />
          )
        })}
      </ul>
      {restOfMembers.length > 0 && (
        <ul className="px-4 py-4">
          {restOfMembers.length > 0 &&
            restOfMembers
              .filter(
                (member, index) =>
                  isExpanded || index + topThreeMembers?.length < 5
              )
              .map((member, index) => {
                const rank = `${index + 1 + topThreeMembers?.length}.`

                const quantity = member?.results?.total ? (
                  <span className="leading-[160%]">
                    <strong>
                      {formatValue(parseFloat(member?.results?.total), {
                        language,
                      })}
                    </strong>{' '}
                    <span className="text-sm font-light">
                      <Trans>tonnes</Trans>
                    </span>
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

      {group.members.length > 5 && !isExpanded && (
        <button
          onClick={() => setIsExpanded(true)}
          className="bg-Transparent text-primary-500 mt-4 w-full border-none text-center text-sm underline">
          <Trans>
            Voir les {String(group.members.length - 5)} autre{withS} participant
            {withS}
          </Trans>
        </button>
      )}
    </>
  )
}
