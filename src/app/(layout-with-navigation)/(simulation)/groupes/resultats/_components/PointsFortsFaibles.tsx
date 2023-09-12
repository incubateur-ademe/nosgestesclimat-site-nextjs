'use client'

import TransClient from '@/components/translation/TransClient'
import { Points } from '@/types/groups'
import PointsListItem from './PointsListItem'

export default function PointsFortsFaibles({
  pointsForts,
  pointsFaibles,
}: {
  pointsForts?: Points[]
  pointsFaibles?: Points[]
}) {
  return (
    <div>
      <h2 className="mt-0 text-lg" data-cypress-id="points-fort-faibles-title">
        <TransClient>Vos points forts</TransClient>
      </h2>
      <p className="mb-4 text-gray-500">
        <TransClient>Par rapport à la moyenne du groupe.</TransClient>
      </p>
      <ul className="pl-0">
        {pointsForts?.map((point, index) => {
          const { name, value, difference } = point.resultObject

          return (
            <PointsListItem
              name={name}
              value={value}
              difference={difference || 0}
              key={`points-forts-${index}`}
            />
          )
        })}
      </ul>

      <h2 className="mt-6 text-lg">
        <TransClient>Vos points faibles</TransClient>
      </h2>
      <ul className="pl-0">
        {pointsFaibles?.map((point, index) => {
          const { name, value, difference } = point.resultObject
          return (
            <PointsListItem
              name={name}
              value={value}
              difference={difference || 0}
              key={`points-faibles-${index}`}
            />
          )
        })}
      </ul>
    </div>
  )
}
