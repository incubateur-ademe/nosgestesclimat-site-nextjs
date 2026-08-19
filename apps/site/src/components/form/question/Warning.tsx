'use client'

import Trans from '@/components/translation/trans/TransClient'
import { WARNING_MESSAGE_ID, WARNING_SHAKE_EVENT } from '@/constants/warning'
import Markdown from '@/design-system/utils/Markdown'
import { useLocale } from '@/hooks/useLocale'
import getValueIsOverFloorOrCeiling from '@/publicodes-state/helpers/getValueIsOverFloorOrCeiling'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

interface Props {
  type?: string
  plancher?: number
  plafond?: number
  warning?: string
  value?: number
  unit?: string
}
export default function Warning({
  type,
  plancher,
  plafond,
  warning,
  value,
  unit,
}: Props) {
  const locale = useLocale()

  const [isShaking, setIsShaking] = useState(false)
  const shakeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const { isOverCeiling, isBelowFloor } = getValueIsOverFloorOrCeiling({
    value,
    plafond,
    plancher,
  })

  const shouldDisplay = type === 'number' && (isBelowFloor || isOverCeiling)

  // Shake the warning when the user tries to click the disabled "next" button
  useEffect(() => {
    const handleShake = () => {
      if (shakeTimeoutRef.current) clearTimeout(shakeTimeoutRef.current)
      setIsShaking(true)
      shakeTimeoutRef.current = setTimeout(() => setIsShaking(false), 400)
    }
    document.addEventListener(WARNING_SHAKE_EVENT, handleShake)
    return () => {
      document.removeEventListener(WARNING_SHAKE_EVENT, handleShake)
      if (shakeTimeoutRef.current) clearTimeout(shakeTimeoutRef.current)
    }
  }, [])

  return (
    <AnimatePresence>
      {shouldDisplay && (
        <motion.div
          id={WARNING_MESSAGE_ID}
          initial={{ height: 0, marginBottom: 0 }}
          animate={{ height: 'auto', marginBottom: '1rem' }}
          exit={{
            height: 0,
            marginBottom: 0,
            transition: { duration: 0.25, ease: 'easeInOut' },
          }}
          className="overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: isShaking ? [0, -8, 8, -6, 6, -3, 0] : 0,
            }}
            transition={{
              opacity: { duration: 0.2 },
              scale: { duration: 0.2 },
              x: { duration: 0.4, ease: 'easeInOut' },
            }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="mb-4 inline-flex flex-col items-start justify-center rounded-xl border-2 border-red-300 bg-red-200 p-2 text-sm">
            {plancher && plafond ? (
              <p>
                <Trans>La valeur pour ce champ est comprise entre</Trans>{' '}
                {plancher.toLocaleString(locale)} <Trans>et</Trans> {plafond}{' '}
                {unit}.
              </p>
            ) : plancher ? (
              <p>
                <Trans>La valeur minimum pour ce champ est de</Trans>{' '}
                {plancher.toLocaleString(locale)} {unit}.
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
      )}
    </AnimatePresence>
  )
}
