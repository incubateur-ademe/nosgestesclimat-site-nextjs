import { ReactNode } from 'react'
import CheckCircleIcon from '../icons/CheckCircleIcon'

type Props = {
  shouldShowMessage: boolean
  label?: ReactNode
}

export default function ModificationSaved({ shouldShowMessage, label }: Props) {
  return (
    <div
      aria-hidden={!shouldShowMessage}
      className={`mt-2 text-xs transition-opacity ${!shouldShowMessage ? 'opacity-0' : 'opacity-100'}`}>
      <CheckCircleIcon className="fill-emerald-dark h-4 w-4" />

      <span className="text-emerald-dark">
        {label ?? <NGCTrans>Modifications sauvegardées</NGCTrans>}
      </span>
    </div>
  )
}
