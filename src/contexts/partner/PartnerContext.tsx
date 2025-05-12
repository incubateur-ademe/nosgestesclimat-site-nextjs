'use client'

import RedirectTimer from '@/components/interactions/RedirectTimer'
import Trans from '@/components/translation/trans/TransClient'
import { PARTNER_KEY } from '@/constants/partners'
import type { AlertType } from '@/design-system/alerts/alert/Alert'
import ButtonLink from '@/design-system/buttons/ButtonLink'
import Title from '@/design-system/layout/Title'
import Emoji from '@/design-system/utils/Emoji'
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

  const partnerParams: Record<string, string> | undefined = useMemo(() => {
    const params =
      getPartnerFromStorage() ??
      Object.fromEntries(
        searchParams
          .entries()
          .filter(([key]) => key === PARTNER_KEY || key.startsWith(PARTNER_KEY))
      )

    return Object.keys(params).length ? params : undefined
  }, [searchParams])

  const isPartnerVerified = useVerifyPartner(partnerParams?.partner)

  const hasNoPartnerParam = Object.keys(partnerParams || {}).length === 0

  const handleExportSituation = useCallback(async () => {
    if (!partnerParams) return

    try {
      const { redirectUrl: redirectUrlFromResponse } =
        (await exportSituationAsync({
          situation,
          partner: partnerParams[PARTNER_KEY],
          partnerParams,
        })) ?? {}

      if (!redirectUrlFromResponse) throw new Error('No redirect URL')

      setRedirectUrl(redirectUrlFromResponse)

      setAlertToDisplay({
        type: 'success',
        content: (
          <div className="xs:text-left text-center">
            <Title
              title={
                <span className="inline-block">
                  <Trans>Vous avez terminé le test !</Trans> <Emoji>💪</Emoji>
                </span>
              }
              tag="h2"
            />
            <p className="text-sm md:text-base">
              <Trans>Merci d'avoir complété votre test.</Trans>
            </p>
            <p className="text-sm md:text-base">
              <Trans>
                Nous vous redirigerons vers le site de notre partenaire dans :
              </Trans>
            </p>

            <RedirectTimer
              duration={40}
              className="text-lg"
              href={redirectUrlFromResponse}
            />

            <span className="mt-8 flex w-full justify-start">
              <ButtonLink
                size="sm"
                color="primary"
                data-testid="button-redirect"
                href={redirectUrlFromResponse}>
                Revenir au site partenaire
              </ButtonLink>
            </span>
          </div>
        ),
      })
    } catch (error) {
      captureException(error)

      setAlertToDisplay({
        type: 'error',
        content: (
          <div className="xs:text-left text-center">
            <span className="mb-2 block">
              <Emoji className="mr-2 text-base">😫</Emoji>
              <Trans>
                Oups ! Une erreur s'est produite au moment d'envoyer vos
                résultats à notre partenaire. Veuillez recommencer le parcours
                depuis l'interface du site partenaire.
              </Trans>
            </span>
          </div>
        ),
      })
    } finally {
      removePartnerFromStorage()
    }
    // False positive
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exportSituationAsync, situation, partnerParams, router])

  useEffect(() => {
    // Redirect to 404
    if (
      partnerParams &&
      typeof isPartnerVerified !== 'undefined' &&
      !isPartnerVerified
    ) {
      router.push('/404')
    }
  }, [isPartnerVerified, router, partnerParams])

  useEffect(() => {
    if (
      !isPartnerVerified ||
      hasNoPartnerParam ||
      typeof progression === 'undefined' ||
      !partnerParams
    )
      return

    if (progression === 1) {
      handleExportSituation()
    } else if (progression !== 1 && !getPartnerFromStorage()) {
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
        redirectUrl,
      }}>
      {children}
    </PartnerContext>
  )
}

export const usePartner = () => useContext(PartnerContext)
