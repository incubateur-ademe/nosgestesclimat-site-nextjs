'use client'

import Trans from '@/components/translation/Trans'
import { eauMetric } from '@/constants/metric'
import Emoji from '@/design-system/utils/Emoji'
import { formatFootprint } from '@/helpers/formatters/formatFootprint'
import { useRule } from '@/publicodes-state'
import { Group } from '@/types/groups'
import { QueryObserverResult } from '@tanstack/react-query'
import { useMemo } from 'react'
import ClassementMember from './ClassementMember'

type Props = {
  group: Group
  refetchGroup: () => Promise<QueryObserverResult<Group, Error>>
}

export default function WaterRanking({ group, refetchGroup }: Props) {
  const { numericValue: userWaterFootprint } = useRule('bilan', eauMetric)

  const sortedMembers = useMemo(() => {
    return [...group.participants].sort(
      (a, b) =>
        (a.simulation?.computedResults?.eau?.bilan ?? 0) -
        (b.simulation?.computedResults?.eau?.bilan ?? 0)
    )
  }, [group.participants])

  return (
    <div className="mt-4">
      <p className="mb-4 rounded-lg border-2 border-primary-200 p-2 text-sm md:max-w-[60%]">
        <Emoji>✨</Emoji>{' '}
        <Trans>
          Voici un aperçu du classement des participants en fonction de leur
          empreinte eau. Cette fonctionnalité est encore en cours de
          développement.
        </Trans>
      </p>

      <ul className="rounded-xl bg-primary-300 px-3 py-4">
        {sortedMembers.map((member, index) => {
          const { formattedValue, unit } = formatFootprint(
            member.simulation?.computedResults?.eau?.bilan ?? 0,
            { metric: eauMetric }
          )

          return (
            <ClassementMember
              key={member._id}
              rank={`${index + 1}.`}
              name={member.name}
              quantity={
                <span className="m-none leading-[160%]">
                  <strong>{formattedValue}</strong>{' '}
                  <span className="text-sm font-light">
                    {unit} / <Trans i18nKey="friends.day">jour</Trans>
                  </span>
                </span>
              }
              isCurrentMember={
                member.simulation?.computedResults?.eau?.bilan ===
                userWaterFootprint
              }
              refetchGroup={refetchGroup}
              userId={member.userId}
              group={group}
              textColor="text-default"
            />
          )
        })}
      </ul>
    </div>
  )
}
