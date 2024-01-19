import Markdown from '@/design-system/utils/Markdown'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

export default function Avertissement({
  avertissement,
}: {
  avertissement: string | ReactNode
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className="mb-4 flex flex-col items-end rounded-md bg-white p-4 text-sm text-red-700">
      {typeof avertissement === 'string' ? (
        <Markdown>{avertissement}</Markdown>
      ) : (
        avertissement
      )}
    </motion.div>
  )
}
