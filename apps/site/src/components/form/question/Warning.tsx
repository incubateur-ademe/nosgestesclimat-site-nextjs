'use client'

import Trans from '@/components/translation/trans/TransClient'
import Markdown from '@/design-system/utils/Markdown'
import { useLocale } from '@/hooks/useLocale'
import { useRule } from '@/publicodes-state'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import { motion } from 'framer-motion'

interface Props {
  question: DottedName
  id?: string
}
export default function Warning({ question, id }: Props) {
  const locale = useLocale()

  const { plancher, plafond, warning, unit } = useRule(question)

  return (
    <motion.div
      id={id}
      initial={{ height: 0, marginBottom: 0, opacity: 0 }}
      animate={{ height: 'auto', marginBottom: '1rem', opacity: 1 }}
      exit={{
        height: 0,
        marginBottom: 0,
        opacity: 0,
        transition: { duration: 0.25, ease: 'easeInOut' },
      }}
      className="overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          opacity: { duration: 0.2 },
          scale: { duration: 0.2 },
        }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="mb-4 inline-flex flex-col items-start justify-center rounded-xl border-2 border-red-300 bg-red-200 p-2 text-sm">
        {plancher && plafond ? (
          <p>
            <Trans>La valeur pour ce champ est comprise entre</Trans>{' '}
            {plancher.toLocaleString(locale)} <Trans>et</Trans> {plafond}
            &nbsp;<Trans>{unit}</Trans>.
          </p>
        ) : plancher ? (
          <p>
            <Trans>La valeur minimum pour ce champ est de</Trans>{' '}
            {plancher.toLocaleString(locale)}&nbsp;{unit}.
          </p>
        ) : plafond ? (
          <p>
            <Trans>La valeur maximum pour ce champ est de</Trans>{' '}
            {plafond.toLocaleString(locale)}&nbsp;<Trans>{unit}</Trans>.
          </p>
        ) : warning ? (
          <Markdown>{warning}</Markdown>
        ) : null}
      </motion.div>
    </motion.div>
  )
}
