'use client'

import { PARTNER_KEY } from '@/constants/partners'
import { getLinkToSimulateur } from '@/helpers/navigation/simulateurPages'
import { getPartnerFromStorage } from '@/helpers/partners/getPartnerFromStorage'
import { removePartnerFromStorage } from '@/helpers/partners/removePartnerFromStorage'
import { setPartnerInStorage } from '@/helpers/partners/setPartnerInStorage'
import { useCurrentSimulation } from '@/publicodes-state'
import { captureException } from '@sentry/nextjs'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useMemo } from 'react'
import { useExportSituation } from '../simulation/useExportSituation'

export function usePartners() {
  const searchParams = useSearchParams()

  const { progression, situation } = useCurrentSimulation()

  const { exportSituationAsync } = useExportSituation()

  const router = useRouter()

  const partnerParams = useMemo(() => {
    return (
      getPartnerFromStorage() ??
      Object.fromEntries(
        searchParams
          .entries()
          .filter(([key]) => key === PARTNER_KEY || key.startsWith(PARTNER_KEY))
      )
    )
  }, [searchParams])

  const hasNoPartnerParam = Object.keys(partnerParams).length === 0

  const handleExportSituation = useCallback(async () => {
    try {
      await exportSituationAsync({
        situation,
        partner: partnerParams[PARTNER_KEY],
        partnerParams,
      })
    } catch (error) {
      captureException(error)
    } finally {
      removePartnerFromStorage()
    }
  }, [exportSituationAsync, situation, partnerParams])

  useEffect(() => {
    if (hasNoPartnerParam || typeof progression === 'undefined') return

    if (progression === 1) {
      handleExportSituation()
    } else {
      // Save partner info in Session Storage
      setPartnerInStorage(partnerParams)

      router.push(getLinkToSimulateur())
    }
  }, [
    handleExportSituation,
    hasNoPartnerParam,
    partnerParams,
    progression,
    router,
    searchParams,
    situation,
  ])
}
