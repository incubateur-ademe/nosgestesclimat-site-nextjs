import Trans from '@/components/translation/Trans'
import Markdown from '@/design-system/utils/Markdown'
import { motion } from 'framer-motion'

type Props = {
  type?: string
  plancher?: number
  plafond?: number
  warning?: string
  tempValue?: number
}
export default function Warning({
  type,
  plancher,
  plafond,
  warning,
  tempValue,
}: Props) {
  if (type !== 'number') return null

  if (plancher === undefined && plafond === undefined) return null

  if (
    plancher !== undefined &&
    (tempValue ?? 0) >= plancher &&
    plafond !== undefined &&
    (tempValue ?? 0) <= plafond
  )
    return null

  if (
    plancher === undefined &&
    plafond !== undefined &&
    (tempValue ?? 0) <= plafond
  )
    return null

  if (
    plafond === undefined &&
    plancher !== undefined &&
    (tempValue ?? 0) >= plancher
  )
    return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className="mb-4 inline-flex flex-col items-start rounded-xl border-2 border-red-300 bg-red-200 p-4 pb-0 text-sm">
      {warning ? (
        <Markdown>{warning}</Markdown>
      ) : plancher && plafond ? (
        <p className="p-0">
          <Trans>La valeur pour ce champ est comprise entre</Trans> {plancher}{' '}
          <Trans>et</Trans> {plafond}.
        </p>
      ) : plancher ? (
        <p className="p-0">
          <Trans>La valeur minimum pour ce champ est de</Trans> {plancher}
        </p>
      ) : plafond ? (
        <p className="p-0">
          <Trans>La valeur maximum pour ce champ est de</Trans> {plafond}
        </p>
      ) : null}
    </motion.div>
  )
}
