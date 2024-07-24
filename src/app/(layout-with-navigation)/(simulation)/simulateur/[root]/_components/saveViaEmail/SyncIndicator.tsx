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
    <div className="absolute bottom-10">
      {isSyncedWithBackend ? (
        <div className="h-[3px] w-12 rounded-full bg-secondary-700" />
      ) : (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: saveDelay / 1000 }}
          className="h-[3px] w-12 origin-left rounded-full bg-secondary-700"
        />
      )}
    </div>
  )
}
