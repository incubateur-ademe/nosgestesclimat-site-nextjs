import CheckIcon from '@/components/icons/CheckIcon'
import CloseIcon from '@/components/icons/Close'
import { endClickAction } from '@/constants/tracking/pages/end'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import { useUser } from '@/publicodes-state'
import { DottedName } from '@/publicodes-state/types'
import { trackEvent } from '@/utils/matomo/trackEvent'

type Props = {
  action: DottedName
}

export default function ActionButtons({ action }: Props) {
  const { toggleActionChoice, rejectAction } = useUser()

  return (
    <div className="flex justify-around">
      <ButtonLink
        color="secondary"
        onClick={() => {
          trackEvent(endClickAction(action))
          rejectAction(action)
        }}
        href="/actions"
        className="h-10 w-10 border-red-600 p-0 hover:border-red-600 hover:bg-red-200 focus:ring-red-600">
        <CloseIcon className="fill-red-600" />
      </ButtonLink>
      <ButtonLink
        onClick={() => {
          trackEvent(endClickAction(action))
          toggleActionChoice(action)
        }}
        href="/actions"
        className="h-10 w-10 border-green-600 bg-green-600 p-0 hover:border-green-700 hover:bg-green-700 focus:ring-green-700">
        <CheckIcon className="fill-white" />
      </ButtonLink>
    </div>
  )
}
