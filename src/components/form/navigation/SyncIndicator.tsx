'use client'

import { useBackgroundSyncSimulation } from '@/hooks/simulation/useBackgroundSyncSimulation'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function SyncIndicator() {
  const { isSyncedWithBackend, saveDelay } = useBackgroundSyncSimulation()

  const [initAnimation, setInitAnimation] = useState(isSyncedWithBackend)

  useEffect(() => {
    if (!isSyncedWithBackend) {
      setInitAnimation(true)
    }
  }, [isSyncedWithBackend])

  useEffect(() => {
    let timeout: NodeJS.Timeout
    if (initAnimation) {
      timeout = setTimeout(() => setInitAnimation(false), 500)
    }
    return () => timeout && clearTimeout(timeout)
  }, [initAnimation])

  return (
    <div className="absolute top-0 right-0 left-0">
      {isSyncedWithBackend ? (
        <div className="bg-primary-200 h-0.5 w-full rounded-full" />
      ) : (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: saveDelay / 1000 }}
          className="bg-primary-200 h-0.5 w-full origin-left rounded-full"
        />
      )}
    </div>
  )
}
