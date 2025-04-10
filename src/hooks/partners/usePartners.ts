'use client'

import { useCurrentSimulation } from '@/publicodes-state'
import { postSituation } from '@/services/partners/postSituation'
import { useEffect, useMemo } from 'react'

const PARTNER_KEY = 'partner'

export function usePartners() {
  // Get all search params from URL
  const searchParams = useMemo(
    () => new URLSearchParams(window.location.href.split('?')?.[1] ?? ''),
    []
  )

  const { progression, situation } = useCurrentSimulation()

  const hasNoPartnerParam = !Array.from(searchParams.keys()).some(
    (key) => key === PARTNER_KEY || key.startsWith(`${PARTNER_KEY}-`)
  )

  // User has already completed the test, send the situation
  useEffect(() => {
    if (hasNoPartnerParam || typeof progression === 'undefined') return

    async function handlePostSituation() {
      await postSituation({
        situation,
        partner: searchParams.get(PARTNER_KEY) as string,
        partnerParams: searchParams,
      })
    }

    if (progression === 1) {
      handlePostSituation()
    }
  }, [progression, searchParams, situation, hasNoPartnerParam])

  // Do nothing if no partner or partner-* search param
  if (hasNoPartnerParam) {
    return
  }
}
