'use client'

import TransClient from '@/components/translation/trans/TransClient'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'

const id = 'tooltip-info-filters'

export default function InfoTooltipIcon({ className = '' }) {
  return (
    <div className={className}>
      <span
        className="text-primary-700 ml-1 cursor-pointer text-2xl font-bold"
        data-tooltip-id={id}>
        &#9432;
      </span>
      <Tooltip id={id}>
        <div className="max-w-sm">
          <TransClient>
            Seules les options incluant plus de 3 participants sont accessibles,
            et ce, dans un objectif de préservation de l’anonymat des
            participants.
          </TransClient>
        </div>
      </Tooltip>
    </div>
  )
}
