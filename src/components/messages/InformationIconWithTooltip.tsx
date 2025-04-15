'use client'

import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'

type Props = {
  className?: string
  children: React.ReactNode
  id: string
}

export default function InformationIconWithTooltip({
  className = '',
  children,
  id,
}: Props) {
  return (
    <div className={className}>
      <span
        className="text-primary-700 ml-1 cursor-pointer text-2xl font-bold"
        data-tooltip-id={id}>
        &#9432;
      </span>
      <Tooltip id={id}>
        <div className="max-w-sm">{children}</div>
      </Tooltip>
    </div>
  )
}
