'use client'

import RedirectTimer from '@/components/interactions/RedirectTimer'
import Trans from '@/components/translation/trans/TransClient'
import { PARTNER_KEY } from '@/constants/partners'
import type { AlertType } from '@/design-system/alerts/alert/Alert'
import ButtonLink from '@/design-system/buttons/ButtonLink'
import Loader from '@/design-system/layout/Loader'
import { getLinkToSimulateur } from '@/helpers/navigation/simulateurPages'
import { getPartnerFromStorage } from '@/helpers/partners/getPartnerFromStorage'
import { removePartnerFromStorage } from '@/helpers/partners/removePartnerFromStorage'
import { setPartnerInStorage } from '@/helpers/partners/setPartnerInStorage'
import { useExportSituation } from '@/hooks/partners/useExportSituation'
import { useVerifyPartner } from '@/hooks/partners/useVerifyPartner'
import { useCurrentSimulation } from '@/publicodes-state'
import { captureException } from '@sentry/nextjs'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  createContext,
  type PropsWithChildren,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

type AlertToDisplay = {
  type: AlertType
  content: ReactNode
}

type PartnerContextType = {
  alertToDisplay?: AlertToDisplay
  redirectUrl: string
}

export const PartnerContext = createContext<PartnerContextType>({
  alertToDisplay: undefined,
  redirectUrl: '',
})

export function PartnerProvider({ children }: PropsWithChildren) {
  const [alertToDisplay, setAlertToDisplay] = useState<
    AlertToDisplay | undefined
  >(undefined)
  const [redirectUrl, setRedirectUrl] = useState('')

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

  const isPartnerVerified = useVerifyPartner(partnerParams.partner)

  const hasNoPartnerParam = Object.keys(partnerParams).length === 0

  const handleExportSituation = useCallback(async () => {
    try {
      const { redirectUrl: redirectUrlFromResponse } =
        await exportSituationAsync({
          situation,
          partner: partnerParams[PARTNER_KEY],
          partnerParams,
        })

      setRedirectUrl(redirectUrlFromResponse)

      setAlertToDisplay({
        type: 'success',
        content: (
          <>
            <span>
              <Loader size="sm" color="dark" />
              <Trans>
                Merci d'avoir complété votre test. Nous vous redirigerons vers
                le site de notre partenaire dans :
              </Trans>
            </span>
            <RedirectTimer href={redirectUrlFromResponse} />
            <span>
              <ButtonLink
                data-testid="button-redirect"
                href={redirectUrlFromResponse}>
                Rediriger maintenant
              </ButtonLink>
            </span>
          </>
        ),
      })
    } catch (error) {
      captureException(error)
    } finally {
      removePartnerFromStorage()
    }
    // False positive
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exportSituationAsync, situation, partnerParams, router])

  useEffect(() => {
    if (
      !isPartnerVerified ||
      hasNoPartnerParam ||
      typeof progression === 'undefined'
    )
      return

    if (progression === 1) {
      handleExportSituation()
    } else if (progression !== 1 && !getPartnerFromStorage()) {
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

  return (
    <PartnerContext
      value={{
        alertToDisplay,
        redirectUrl,
      }}>
      {children}
    </PartnerContext>
  )
}

export const usePartner = () => useContext(PartnerContext)
