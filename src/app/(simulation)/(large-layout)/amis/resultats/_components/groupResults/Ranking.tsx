'use client'

import { Group, Participant } from '@/types/groups'

import Trans from '@/components/translation/Trans'
import { carboneMetric, eauMetric } from '@/constants/metric'
import Emoji from '@/design-system/utils/Emoji'
import { formatFootprint } from '@/helpers/formatters/formatFootprint'
import { getTopThreeAndRestMembers } from '@/helpers/groups/getTopThreeAndRestMembers'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useUser } from '@/publicodes-state'
import { Metrics } from '@incubateur-ademe/nosgestesclimat'
import { QueryObserverResult } from '@tanstack/react-query'
import isMobile from 'is-mobile'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import RankingMember from './ranking/RankingMember'

export default function Ranking({
  group,
  refetchGroup,
  metric,
}: {
  group: Group
  refetchGroup: () => Promise<QueryObserverResult<Group, Error>>
  metric: Metrics
}) {
  const [isExpanded, setIsExpanded] = useState(false)

  const shouldUseAbbreviation = isMobile()

  const { t } = useClientTranslation()

  const {
    user: { userId },
  } = useUser()

  const { topThreeMembers, restOfMembers, membersWithUncompletedSimulations } =
    getTopThreeAndRestMembers(group.participants, metric) || {}

  const withS = group.participants.length - 5 > 1 ? 's' : ''

  const hasOneParticipant = group.participants.length === 1

  const suffix = metric === carboneMetric ? t('CO₂e / an') : t('/ jour')

  return (
    <>
      {metric === eauMetric && (
        <p className="mb-4 rounded-lg border-2 border-primary-200 p-2 text-sm md:max-w-[60%]">
          <Emoji>✨</Emoji>{' '}
          <Trans>
            Voici un aperçu du classement des participants en fonction de leur
            empreinte eau. Cette fonctionnalité est encore en cours de
            développement.
          </Trans>
        </p>
      )}

      <ul
        className={twMerge(
          'mt-2 rounded-xl  px-3 py-4',
          hasOneParticipant
            ? 'bg-primary-50 text-primary-700'
            : 'bg-primary-700 text-white',
          metric === eauMetric ? 'bg-primary-300' : ''
        )}>
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
            participant?.simulation?.computedResults?.[metric]?.bilan ?? '',
            {
              metric,
              shouldUseAbbreviation,
            }
          )

          const quantity = participant?.simulation?.computedResults?.[metric]
            ?.bilan ? (
            <span className="m-none leading-[160%]">
              <strong>{formattedValue}</strong>{' '}
              <span className="text-sm font-light">
                {unit} {suffix}
              </span>
            </span>
          ) : (
            '...'
          )

          return (
            <RankingMember
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
              textColor={
                metric === eauMetric ? 'text-primary-950' : 'text-white'
              }
            />
          )
        })}
      </ul>

      {restOfMembers.length > 0 && (
        <ul className="px-3 py-4">
          {restOfMembers.length > 0 &&
            [...restOfMembers, ...membersWithUncompletedSimulations]
              .filter(
                (participant: Participant, index: number) =>
                  isExpanded || index + topThreeMembers?.length < 5
              )
              .map((participant: Participant, index: number) => {
                const rank =
                  participant.simulation.progression !== 1
                    ? '--'
                    : `${index + 1 + topThreeMembers?.length}.`

                const { formattedValue, unit } = formatFootprint(
                  participant?.simulation?.computedResults?.[metric]?.bilan,
                  {
                    metric,
                    shouldUseAbbreviation,
                  }
                )

                const quantity =
                  participant.simulation.progression !== 1 ? (
                    <span className="text-sm text-gray-600">
                      <Trans>En cours</Trans>
                    </span>
                  ) : participant?.simulation?.computedResults?.[metric]
                      ?.bilan ? (
                    <span className="leading-[160%]">
                      <strong>{formattedValue}</strong>{' '}
                      <span className="text-sm font-light">
                        {unit} {suffix}
                      </span>
                    </span>
                  ) : (
                    '...'
                  )

                return (
                  <RankingMember
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
