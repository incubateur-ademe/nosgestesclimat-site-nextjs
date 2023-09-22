import Button from '@/design-system/inputs/Button'
import Markdown from '@/design-system/utils/Markdown'
import { useRule } from '@/publicodes-state'

type Props = {
  notification: string
}
export default function Notification({ notification }: Props) {
  const { description, setValue } = useRule(notification)

  if (!description) return

  return (
    <div className="mb-4 flex w-2/3 flex-col items-end rounded-md bg-grey-100 p-2 text-sm">
      <Markdown>{description}</Markdown>
      <Button size="sm" onClick={() => setValue(false)}>
        J'ai compris
      </Button>
    </div>
  )
}
