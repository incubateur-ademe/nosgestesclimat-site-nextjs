import Markdown from '@/design-system/utils/Markdown'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

type Props = {
  plancher?: number
  warning?: string | ReactNode
  tempValue?: number
}
export default function Warning({ plancher, warning, tempValue }: Props) {
  console.log('Warning', { plancher, warning, tempValue })
  if (!warning || plancher === undefined || tempValue === undefined) return null

  if (tempValue >= plancher) return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className="mb-4 flex flex-col items-end rounded-md bg-red-200 p-4 pb-0 text-sm">
      {typeof warning === 'string' ? <Markdown>{warning}</Markdown> : warning}
    </motion.div>
  )
}
