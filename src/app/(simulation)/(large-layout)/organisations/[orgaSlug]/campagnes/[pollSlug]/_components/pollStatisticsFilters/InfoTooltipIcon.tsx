'use client'

import Trans from '@/components/translation/Trans'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'

const id = 'tooltip-info-filters'

export default function InfoTooltipIcon({ className = '' }) {
  return (
    <div className={className}>
      <span
        className="ml-1 cursor-pointer text-2xl font-bold text-primary-700"
        data-tooltip-id={id}>
        &#9432;
      </span>
      <Tooltip id={id}>
        <div className="max-w-sm">
          <Trans>
            Seules les options incluant plus de 3 participants sont accessibles,
            et ce, dans un objectif de préservation de l’anonymat des
            participants.
          </Trans>
        </div>
      </Tooltip>
    </div>
  )
}
