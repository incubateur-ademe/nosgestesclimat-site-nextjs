import Trans from '@/components/translation/Trans'
import Markdown from '@/design-system/utils/Markdown'
import { useLocale } from '@/hooks/useLocale'
import getValueIsOverFloorOrCeiling from '@/publicodes-state/helpers/getValueIsOverFloorOrCeiling'
import { motion } from 'framer-motion'

type Props = {
  type?: string
  plancher?: number
  plafond?: number
  warning?: string
  tempValue?: number
  unit?: string
}
export default function Warning({
  type,
  plancher,
  plafond,
  warning,
  tempValue,
  unit,
}: Props) {
  const locale = useLocale()

  if (type !== 'number') return null

  const { isOverCeiling, isBelowFloor } = getValueIsOverFloorOrCeiling({
    value: tempValue,
    plafond,
    plancher,
  })

  if (!isBelowFloor && !isOverCeiling) return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className="mb-4 inline-flex flex-col items-start rounded-xl border-2 border-red-300 bg-red-200 p-4 pb-0 text-sm">
      {plancher && plafond ? (
        <p className="p-0">
          <Trans locale={locale}>
            La valeur pour ce champ est comprise entre
          </Trans>{' '}
          {plancher.toLocaleString(locale)} <Trans locale={locale}>et</Trans>{' '}
          {plafond} {unit}.
        </p>
      ) : plancher ? (
        <p className="p-0">
          <Trans locale={locale}>La valeur minimum pour ce champ est de</Trans>{' '}
          {plancher.toLocaleString(locale)} {unit}.
        </p>
      ) : plafond ? (
        <p className="p-0">
          <Trans locale={locale}>La valeur maximum pour ce champ est de</Trans>{' '}
          {plafond.toLocaleString(locale)} {unit}.
        </p>
      ) : warning ? (
        <Markdown>{warning}</Markdown>
      ) : null}
    </motion.div>
  )
}
