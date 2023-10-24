import { formatValue } from 'publicodes'
import { ElementType } from 'react'
import Badge from '../layout/Badge'
import Card from '../layout/Card'
import Emoji from '../utils/Emoji'

type Props = {
  icons: string
  footprintAvoided: number
  title: string
  tag?: ElementType | string
  href?: string
}

export default function ActionCard({
  icons,
  footprintAvoided,
  title,
  tag = 'div',
  ...props
}: Props) {
  return (
    <Card
      tag={tag}
      className="h-[140px] w-[230px] pr-2 !no-underline"
      {...props}>
      <div className="flex justify-between">
        <Emoji className="flex gap-1">{icons}</Emoji>

        <Badge color="green">
          <strong>
            - {formatValue(Math.round(footprintAvoided), { precision: 0 })}
          </strong>{' '}
          kg
        </Badge>
      </div>
      <p className="mt-4 font-bold">{title}</p>
    </Card>
  )
}
