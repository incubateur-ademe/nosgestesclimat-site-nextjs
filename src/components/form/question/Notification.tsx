import Trans from '@/components/translation/Trans'
import Button from '@/design-system/inputs/Button'
import Markdown from '@/design-system/utils/Markdown'
import { useRule } from '@/publicodes-state'
import { motion } from 'framer-motion'
type Props = {
  notification: string
}
export default function Notification({ notification }: Props) {
  const { description, setValue } = useRule(notification)

  if (!description) return

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className="mb-4 flex flex-col items-end rounded-md bg-white p-4 text-sm">
      <Markdown className="notification">{description}</Markdown>
      <Button size="sm" onClick={() => setValue(false)}>
        <Trans>J'ai compris</Trans>
      </Button>
    </motion.div>
  )
}
