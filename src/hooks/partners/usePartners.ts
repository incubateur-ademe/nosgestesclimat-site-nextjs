'use client'

import { PARTNER_KEY } from '@/constants/partners'
import { setPartnerInStorage } from '@/helpers/partners/setPartnerInStorage'
import { useCurrentSimulation } from '@/publicodes-state'
import { postSituation } from '@/services/partners/postSituation'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo } from 'react'

const windowClient: Window =
  typeof window === 'undefined'
    ? ({ location: { search: '' } } as Window)
    : window

export function usePartners() {
  // Get all search params from URL
  const searchParams = useMemo(
    () => new URLSearchParams(windowClient.location.search),
    []
  )

  const { progression, situation } = useCurrentSimulation()

  const router = useRouter()

  const partnerParams = searchParams
    .entries()
    .reduce((acc: Record<string, string>, [key, value]: [string, string]) => {
      const accUpdated = { ...acc }

      if (key.includes(PARTNER_KEY)) {
        accUpdated[key] = value
      }

      return accUpdated
    }, {})

  const hasNoPartnerParam = Object.keys(partnerParams).length === 0

  const isProgressionUndefined = typeof progression === 'undefined'

  // User has already completed the test, send the situation
  useEffect(() => {
    if (hasNoPartnerParam || isProgressionUndefined || progression !== 1) return

    async function handlePostSituation() {
      await postSituation({
        situation,
        partner: searchParams.get(PARTNER_KEY) as string,
        partnerParams: searchParams,
      })
    }

    handlePostSituation()
  }, [
    isProgressionUndefined,
    progression,
    searchParams,
    situation,
    hasNoPartnerParam,
  ])
  // User hasn't completed the test, redirect while saving partner info
  useEffect(() => {
    // Go through only if user has a simulation with a progression !== 1
    if (hasNoPartnerParam || isProgressionUndefined || progression === 1) return

    // Save partner info in Session Storage
    setPartnerInStorage(partnerParams)

    // Let the user pass his / her test
  }, [hasNoPartnerParam, isProgressionUndefined, progression, partnerParams])

  // Do nothing if no partner or partner-* search param
  if (hasNoPartnerParam) {
    return
  }
}
