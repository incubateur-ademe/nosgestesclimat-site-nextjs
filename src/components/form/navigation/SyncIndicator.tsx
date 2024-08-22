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

  console.log('isSyncedWithBackend', isSyncedWithBackend)
  return (
    <div className="absolute left-0 right-0 top-0">
      {isSyncedWithBackend ? (
        <div className="h-0.5 w-full rounded-full bg-primary-200" />
      ) : (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: saveDelay / 1000 }}
          className="h-0.5 w-full origin-left rounded-full bg-primary-200"
        />
      )}
    </div>
  )
}
