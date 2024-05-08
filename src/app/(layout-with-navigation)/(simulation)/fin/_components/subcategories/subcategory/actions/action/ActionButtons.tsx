import CheckIcon from '@/components/icons/CheckIcon'
import CloseIcon from '@/components/icons/Close'
import Button from '@/design-system/inputs/Button'
import { DottedName } from '@/publicodes-state/types'

type Props = {
  action: DottedName
}

export default function ActionButtons({ action }: Props) {
  return (
    <div className="flex justify-around">
      <Button
        color="secondary"
        onClick={() => console.log(action)}
        className="h-10 w-10 border-red-600 p-0 hover:border-red-600 hover:bg-red-200 focus:ring-red-600">
        <CloseIcon className="fill-red-600" />
      </Button>
      <Button
        onClick={() => ''}
        className="h-10 w-10 border-green-600 bg-green-600 p-0 hover:border-green-700 hover:bg-green-700 focus:ring-green-700">
        <CheckIcon className="fill-white" />
      </Button>
    </div>
  )
}
