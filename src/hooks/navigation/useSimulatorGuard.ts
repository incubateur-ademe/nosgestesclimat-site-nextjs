import {
  getLinkToSimulateur,
  getLinkToTutoriel,
} from '@/helpers/navigation/simulateurPages'
import { useCurrentSimulation, useUser } from '@/publicodes-state'
import { requestIdleCallback } from '@/utils/requestIdleCallback'
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

export function useEndPageGuard() {
  const { progression } = useCurrentSimulation()
  const router = useRouter()

  useEffect(() => {
    if (progression === 1) return
    // Unfortunately, `router.replace` can fail if lot of state updates happens
    // synchronously. We make sure it happens after them with `requestIdleCallback`
    requestIdleCallback(() => router.replace(getLinkToSimulateur()))
  }, [])

  return {
    isRedirecting: progression !== 1,
  }
}
