'use client'

import Trans from '@/components/translation/trans/TransClient'
import Button from '@/design-system/buttons/Button'
import Markdown from '@/design-system/utils/Markdown'
import {
  getBgCategoryColor,
  getBorderCategoryColor,
  getTextCategoryColor,
} from '@/helpers/getCategoryColorClass'
import { useFormState, useRule } from '@/publicodes-state'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import { motion } from 'framer-motion'
import { useEffect } from 'react'

type Props = {
  notification: DottedName
  prevQuestion: DottedName | string
}

export default function Notification({ notification, prevQuestion }: Props) {
  const { description, setValue } = useRule(notification)
  const { currentQuestion } = useFormState()

  useEffect(() => {
    if (prevQuestion !== currentQuestion) {
      setValue(false, {})
    }
  }, [currentQuestion, prevQuestion, setValue])

  if (!description) return

  return (
    <motion.div
      initial={{ opacity: 0, transform: 'translateY(10%)' }}
      animate={{ opacity: 1, transform: 'translateY(0)' }}
      transition={{ duration: 0.3 }}
      className={`mb-4 flex flex-col items-end rounded-xl border-2 ${getBorderCategoryColor(currentQuestion, '200')} ${getBgCategoryColor(currentQuestion, '100')} !${getTextCategoryColor(currentQuestion, '700')} p-4 text-sm`}>
      <div className="mb-2 w-full">
        <Markdown className="notification pb-0">{description}</Markdown>
      </div>
      <Button size="sm" color={'secondary'} onClick={() => setValue(false, {})}>
        <Trans>J'ai compris</Trans>
      </Button>
    </motion.div>
  )
}
