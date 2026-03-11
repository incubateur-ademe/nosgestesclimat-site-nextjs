import { getLinkToTutoriel } from '@/helpers/navigation/simulateurPages'
import { useCurrentSimulation, useUser } from '@/publicodes-state'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useLocale } from '../useLocale'
import { useEndPage } from './useEndPage'

export function useSimulatorGuard() {
  const searchParams = useSearchParams()
  const locale = useLocale()
  const router = useRouter()
  const { tutorials } = useUser()
  const { progression } = useCurrentSimulation()
  const { linkToEndPage } = useEndPage()
  const [isRedirecting] = useState(progression === 1 || !tutorials.testIntro)

  useEffect(() => {
    if (progression === 1) {
      router.replace(linkToEndPage)
    }
    if (!tutorials.testIntro) {
      router.replace(getLinkToTutoriel({ locale, searchParams }))
    }
  }, [])
  return {
    isRedirecting,
  }
}
