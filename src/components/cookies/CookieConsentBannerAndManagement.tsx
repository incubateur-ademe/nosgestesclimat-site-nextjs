'use client'

import { useEffect, useState } from 'react'
import CookieConsentBanner from './CookieConsentBanner'
import CookieConsentManagement from './CookieConsentManagement'

export default function CookieConsentBannerAndManagement() {
  const [isVisible, setIsVisible] = useState(false)
  const [isBoardOpen, setIsBoardOpen] = useState(false)

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà donné son consentement
    const hasConsent = localStorage.getItem('cookie-consent')
    if (!hasConsent) {
      setIsVisible(true)
    }
  }, [])

  const acceptAll = () => {
    localStorage.setItem('cookie-consent', 'all')
    setIsVisible(false)
  }

  const refuseAll = () => {
    localStorage.setItem('cookie-consent', 'refuse')
    setIsVisible(false)
  }

  const acceptEssential = () => {
    localStorage.setItem('cookie-consent', 'essential')
    setIsVisible(false)
  }

  const openSettings = () => {
    setIsBoardOpen(true)
  }

  const closeSettings = () => {
    setIsBoardOpen(false)
    setIsVisible(true)
  }

  const confirmChoices = () => {
    setIsBoardOpen(false)
    setIsVisible(false)
  }

  return (
    <>
      <CookieConsentBanner
        isBoardOpen={isBoardOpen}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        openSettings={openSettings}
        refuseAll={refuseAll}
        acceptAll={acceptAll}
      />

      {/* Modal de gestion des cookies */}
      <CookieConsentManagement
        isBoardOpen={isBoardOpen}
        closeSettings={closeSettings}
        refuseAll={refuseAll}
        acceptAll={acceptAll}
        confirmChoices={confirmChoices}
      />
    </>
  )
}
