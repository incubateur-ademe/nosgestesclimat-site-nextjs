import Emoji from '@/design-system/utils/Emoji'
import { ReactNode } from 'react'
import Trans from '../translation/Trans'

type Props = {
  shouldShowMessage: boolean
  label?: ReactNode
}

export default function ModificationSaved({ shouldShowMessage, label }: Props) {
  return (
    <div
      aria-hidden={!shouldShowMessage}
      className={`mt-2 text-xs transition-opacity ${!shouldShowMessage ? 'opacity-0' : 'opacity-100'}`}>
      <Emoji className="mr-2">✅</Emoji>

      <span className="text-green-700">
        {label ?? <Trans>Modifications sauvegardées</Trans>}
      </span>
    </div>
  )
}
