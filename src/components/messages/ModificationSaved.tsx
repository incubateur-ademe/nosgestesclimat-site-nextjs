import { ReactNode } from 'react'
import CheckCircleIcon from '../icons/CheckCircleIcon'
import Trans from '../translation/Trans'

type Props = {
  shouldShowMessage: boolean
  label?: ReactNode
}

export default function ModificationSaved({ shouldShowMessage, label }: Props) {
  return (
    <div
      aria-hidden={!shouldShowMessage}
      className={`mt-2 flex items-center gap-1 text-xs text-green-700 transition-opacity ${!shouldShowMessage ? 'opacity-0' : 'opacity-100'}`}>
      <CheckCircleIcon className="h-4 w-4 fill-green-700" />

      <span className="text-emerald-dark">
        {label ?? <Trans>Modifications sauvegardées</Trans>}
      </span>
    </div>
  )
}
