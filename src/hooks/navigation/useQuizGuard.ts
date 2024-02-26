import { getLinkToSimulateur } from '@/helpers/navigation/simulateurPages'
import { useUser } from '@/publicodes-state'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export function useQuizGuard() {
  const router = useRouter()

  const { getCurrentSimulation } = useUser()
  const currentSimulation = getCurrentSimulation()
  const progression = currentSimulation?.progression

  const [isGuardInit, setIsGuardInit] = useState(false)
  const [isGuardRedirecting, setIsGuardRedirecting] = useState(false)

  useEffect(() => {
    // we only run the guard at mount
    if (isGuardInit) return
    setIsGuardInit(true)

    if (!currentSimulation) {
      router.push('/404') // TODO: should throw an error
      setIsGuardRedirecting(true)
      return
    }

    if (progression !== 1) {
      router.replace(getLinkToSimulateur())
      setIsGuardRedirecting(true)
      return
    }
  }, [isGuardInit, progression, currentSimulation, router])

  return {
    isGuardInit,
    isGuardRedirecting,
  }
}
