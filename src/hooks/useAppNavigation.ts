import { useUser } from '@/publicodes-state'
import { useRouter } from 'next/navigation'

export default function useAppNavigation() {
  const router = useRouter()

  const { user, getCurrentSimulation } = useUser()

  const currentSimulation = getCurrentSimulation()

  const gotoTest = () => {
    if (!currentSimulation) return

    if (currentSimulation.poll) {
      router.push(`simulateur/infos`)
    } else {
      router.push(`simulateur/bilan`)
    }
  }

  return { gotoTest }
}
