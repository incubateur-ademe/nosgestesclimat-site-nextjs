'use client'

import { PARTNER_KEY } from '@/constants/partners'
import { getLinkToSimulateur } from '@/helpers/navigation/simulateurPages'
import { getPartnerFromStorage } from '@/helpers/partners/getPartnerFromStorage'
import { removePartnerFromStorage } from '@/helpers/partners/removePartnerFromStorage'
import { setPartnerInStorage } from '@/helpers/partners/setPartnerInStorage'
import { displayTimedSuccessToast } from '@/helpers/toasts/displayTimedSuccessToast'
import { useCurrentSimulation } from '@/publicodes-state'
import { captureException } from '@sentry/nextjs'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useMemo } from 'react'
import { useClientTranslation } from '../useClientTranslation'
import { useExportSituation } from './useExportSituation'
import { useVerifyPartner } from './useVerifyPartner'

export function usePartners() {
  const searchParams = useSearchParams()

  const { t } = useClientTranslation()

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
      const { redirectUrl } = await exportSituationAsync({
        situation,
        partner: partnerParams[PARTNER_KEY],
        partnerParams,
      })

      displayTimedSuccessToast(
        t(
          'Vous serez automatiquement redirigé vers notre site partenaire dans 30 secondes.'
        ),
        () => {
          router.push(redirectUrl)
        }
      )
    } catch (error) {
      captureException(error)
    } finally {
      removePartnerFromStorage()
    }
  }, [exportSituationAsync, situation, partnerParams, t, router])

  useEffect(() => {

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
    isPartnerVerified,
  ])
}
