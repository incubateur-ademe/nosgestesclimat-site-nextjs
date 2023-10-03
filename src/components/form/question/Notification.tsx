import Button from '@/design-system/inputs/Button'
import Card from '@/design-system/layout/Card'
import Markdown from '@/design-system/utils/Markdown'
import { useRule } from '@/publicodes-state'

type Props = {
  notification: string
}
export default function Notification({ notification }: Props) {
  const { description, setValue } = useRule(notification)

  if (!description) return

  return (
    <div className="text-right">
      <Card className="!ml-auto mb-4 !inline-block flex-col items-end bg-grey-100 text-right text-sm">
        <Markdown>{description}</Markdown>
        <Button size="sm" onClick={() => setValue(false)}>
          J'ai compris
        </Button>
      </Card>
    </div>
  )
}
