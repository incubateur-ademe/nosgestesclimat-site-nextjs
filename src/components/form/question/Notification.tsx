import Trans from '@/components/translation/Trans'
import Button from '@/design-system/inputs/Button'
import Markdown from '@/design-system/utils/Markdown'
import {
  getBgCategoryColor,
  getBorderCategoryColor,
  getTextCategoryColor,
} from '@/helpers/getCategoryColorClass'
import { useForm, useRule } from '@/publicodes-state'
import { DottedName } from '@incubateur-ademe/nosgestesclimat'
import { motion } from 'framer-motion'
type Props = {
  notification: DottedName
}
export default function Notification({ notification }: Props) {
  const { description, setValue } = useRule(notification)

  const { currentCategory } = useForm()

  if (!description) return

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className={`mb-4 flex flex-col items-end rounded-xl border-2 ${getBorderCategoryColor(currentCategory, '200')} ${getBgCategoryColor(currentCategory, '100')} !${getTextCategoryColor(currentCategory, '700')} p-4 text-sm`}>
      <Markdown className="notification pb-0">{description}</Markdown>
      <Button size="sm" color={'secondary'} onClick={() => setValue(false)}>
        <Trans>J'ai compris</Trans>
      </Button>
    </motion.div>
  )
}
