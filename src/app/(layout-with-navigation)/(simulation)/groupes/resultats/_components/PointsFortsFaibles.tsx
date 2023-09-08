'use client'

import { Points } from '@/types/groups'
import { formatValue } from 'publicodes'
import { Trans } from 'react-i18next'
import Badge from './Badge'
import PercentageDiff from './PercentageDiff'

const ListItem = ({ icon, title, value, variation }) => (
  <li className="mb-3 flex items-center justify-between rounded-md bg-[#F8F8F7] p-3 text-sm last:mb-0">
    <p className="mb-0 flex items-center">
      <span className="mr-3 inline-block text-lg">{icon}</span>
      {title}
      <PercentageDiff variation={variation} />
    </p>

    <Badge>
      <strong>{formatValue(value as number, { precision: 0 })}</strong> kg
    </Badge>
  </li>
)
export default function PointsFortsFaibles({
  pointsForts,
  pointsFaibles,
}: {
  pointsForts: Points
  pointsFaibles: Points
}) {
  return (
    <div>
      <h2 className="mt-0 text-lg" data-cypress-id="points-fort-faibles-title">
        <Trans>Vos points forts</Trans>
      </h2>
      <p className="mb-4 text-gray-500">
        <Trans>Par rapport à la moyenne du groupe.</Trans>
      </p>
      <ul className="pl-0">
        {pointsForts?.map((point, index) => {
          const { title, value, variation } = point.resultObject
          return (
            <ListItem
              icon={icon}
              title={title}
              value={value}
              variation={variation}
              key={`points-forts-${index}`}
            />
          )
        })}
      </ul>

      <h2 className="mt-6 text-lg">
        <Trans>Vos points faibles</Trans>
      </h2>
      <ul className="pl-0">
        {pointsFaibles?.map((point, index) => {
          const { icon, title, value, variation } = point.resultObject
          return (
            <ListItem
              icon={icon}
              title={title}
              value={value}
              variation={variation}
              key={`points-faibles-${index}`}
            />
          )
        })}
      </ul>
    </div>
  )
}
