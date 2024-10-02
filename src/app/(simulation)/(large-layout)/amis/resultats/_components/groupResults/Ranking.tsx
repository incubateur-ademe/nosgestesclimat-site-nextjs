'use client'

import { Group } from '@/types/groups'

import { Metrics } from '@incubateur-ademe/nosgestesclimat'
import { QueryObserverResult } from '@tanstack/react-query'
import CarbonRanking from './ranking/CarbonRanking'
import WaterRanking from './ranking/WaterRanking'

export default function Ranking({
  group,
  refetchGroup,
  footprintSelected,
}: {
  group: Group
  refetchGroup: () => Promise<QueryObserverResult<Group, Error>>
  footprintSelected: Metrics
}) {
  if (!group) {
    return null
  }

  return (
    <>
      {footprintSelected === 'carbone' ? (
        <CarbonRanking group={group} refetchGroup={refetchGroup} />
      ) : (
        <WaterRanking group={group} refetchGroup={refetchGroup} />
      )}
    </>
  )
}
