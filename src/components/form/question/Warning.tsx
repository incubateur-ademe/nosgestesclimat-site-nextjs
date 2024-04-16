import Trans from '@/components/translation/Trans'
import Markdown from '@/design-system/utils/Markdown'
import { motion } from 'framer-motion'

type Props = {
  type?: string
  plancher?: number
  warning?: string
  tempValue?: number
}
export default function Warning({ type, plancher, warning, tempValue }: Props) {
  if (type !== 'number') return null

  if (plancher === undefined) return null

  if ((tempValue ?? 0) >= plancher) return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className="mb-4 flex flex-col items-end rounded-md bg-red-200 p-4 pb-0 text-sm">
      {warning ? (
        <Markdown>{warning}</Markdown>
      ) : (
        <p>
          <Trans>La valeur minimum pour ce champ est de</Trans> {plancher}
        </p>
      )}
    </motion.div>
  )
}
