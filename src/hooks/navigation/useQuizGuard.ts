import { getLinkToSimulateur } from '@/helpers/navigation/simulateurPages'
import { useCurrentSimulation } from '@/publicodes-state'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export function useQuizGuard() {
  const router = useRouter()

  const { progression } = useCurrentSimulation()

  const [isGuardInit, setIsGuardInit] = useState(false)
  const [isGuardRedirecting, setIsGuardRedirecting] = useState(false)

  useEffect(() => {
    // we only run the guard at mount
    if (isGuardInit) return
    setIsGuardInit(true)

    if (progression !== 1) {
      router.replace(getLinkToSimulateur())
      setIsGuardRedirecting(true)
      return
    }
  }, [isGuardInit, progression, router])

  return {
    isGuardInit,
    isGuardRedirecting,
  }
}
