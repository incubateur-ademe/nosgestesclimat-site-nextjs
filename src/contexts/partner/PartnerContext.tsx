'use client'

import Trans from '@/components/translation/trans/TransClient'
import { PARTNER_KEY } from '@/constants/partners'
import { AlertType } from '@/design-system/alerts/alert/Alert'
import ButtonLink from '@/design-system/buttons/ButtonLink'
import Loader from '@/design-system/layout/Loader'
import { getLinkToSimulateur } from '@/helpers/navigation/simulateurPages'
import { getPartnerFromStorage } from '@/helpers/partners/getPartnerFromStorage'
import { removePartnerFromStorage } from '@/helpers/partners/removePartnerFromStorage'
import { setPartnerInStorage } from '@/helpers/partners/setPartnerInStorage'
import { useExportSituation } from '@/hooks/partners/useExportSituation'
import { useVerifyPartner } from '@/hooks/partners/useVerifyPartner'
import { useClientTranslation } from '@/hooks/useClientTranslation'
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
  useRef,
  useState,
} from 'react'

type AlertToDisplay = {
  type: AlertType
  content: ReactNode
}

type PartnerContextType = {
  alertToDisplay?: AlertToDisplay
}

export const PartnerContext = createContext<PartnerContextType>({
  alertToDisplay: undefined,
})

export function PartnerProvider({ children }: PropsWithChildren) {
  const [alertToDisplay, setAlertToDisplay] = useState<
    AlertToDisplay | undefined
  >(undefined)

  const searchParams = useSearchParams()

  const { t } = useClientTranslation()

  const { progression, situation } = useCurrentSimulation()

  const { exportSituationAsync } = useExportSituation()

  const router = useRouter()

  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)

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
      const { redirectUrl } = await exportSituationAsync({
        situation,
        partner: partnerParams[PARTNER_KEY],
        partnerParams,
      })

      setAlertToDisplay({
        type: 'success',
        content: (
          <>
            <span>
              <Loader size="sm" color="dark" />
              <Trans>
                Merci d'avoir complété votre test. Nous vous redirigerons vers
                le site de notre partenaire dans 30 secondes.
              </Trans>
            </span>
            <span>
              <ButtonLink data-testid="button-redirect" href={redirectUrl}>
                Rediriger maintenant
              </ButtonLink>
            </span>
          </>
        ),
      })

      timeoutRef.current = setTimeout(() => {
        router.push(redirectUrl)
      }, 30_000)
    } catch (error) {
      captureException(error)
    } finally {
      removePartnerFromStorage()
    }
  }, [exportSituationAsync, situation, partnerParams, t, router])

  useEffect(() => {
    if (
      !isPartnerVerified ||
      hasNoPartnerParam ||
      typeof progression === 'undefined'
    )
      return

    if (progression === 1) {
      handleExportSituation()
    } else {
      // Save partner info in Session Storage
      setPartnerInStorage(partnerParams)
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
      }}>
      {children}
    </PartnerContext>
  )
}

export const usePartner = () => useContext(PartnerContext)
