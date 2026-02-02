import { safeLocalStorage } from '@/utils/browser/safeLocalStorage'
import posthog from 'posthog-js'
import { useCallback, useState } from 'react'

export interface CookieState {
  posthog: 'accepted' | 'refused' | 'do_not_track'
  googleAds: 'accepted' | 'refused'
}

type BannerDisplayState = 'hidden' | 'banner' | 'form'

const key = 'COOKIE'

/*
@TODO
1. Utiliser un Provider pour l'état bannerDisplayState
2. Utiliser ce hook dans vie privée pour do_not_track de posthog
3. Fix la logique onChange
4. Vérifier que le do_not_track fonctionne (rien n'est envoyé à posthog)
5. Clean clean (si ça marche)
6. Test E2E
  - Vérifier que rien n'est envoyé à posthog si DNT (pas de requete réseau)
  - Si DNT, vérifier que le bandeau cookie est passé à « refuser »
*/

export function useCookieManagement(): {
  state: CookieState
  onChange: (state: CookieState) => void
  bannerDisplayState: BannerDisplayState
  setBannerDisplayState: (state: BannerDisplayState) => void
  rejectAll: () => void
  acceptAll: () => void
} {
  const json = safeLocalStorage.getItem(key)
  const state: CookieState = json
    ? (JSON.parse(json) as CookieState)
    : ({
        posthog: 'refused',
        googleAds: 'refused',
      } as const)

  const [bannerDisplayState, setBannerDisplayState] =
    useState<BannerDisplayState>(json === undefined ? 'banner' : 'hidden')

  const onChange = useCallback((cookieState: CookieState) => {
    safeLocalStorage.setItem(key, JSON.stringify(cookieState))
    setBannerDisplayState('hidden')
    // @TODO fix this logic to handle modification of g
    // Posthog
    if (cookieState.posthog === 'accepted') {
      posthog.opt_in_capturing()
      return
    }
    if (cookieState.posthog === 'refused') {
      posthog.opt_out_capturing()
      return
    }
    if (cookieState.posthog === 'do_not_track') {
      posthog.set_config({
        disable_persistence: true,
        disable_session_recording: true,
        opt_out_capturing_by_default: true,
      })
      posthog.opt_out_capturing()
      return
    }

    // Google ads
    if (cookieState.googleAds === 'accepted') {
      window.gtag?.('consent', 'update', {
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
      })
      return
    }
    if (cookieState.googleAds === 'refused') {
      window.gtag?.('consent', 'update', {
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      })
      return
    }
  }, [])

  const rejectAll = useCallback(() => {
    onChange({
      posthog: 'refused',
      googleAds: 'refused',
    })
  }, [onChange])

  const acceptAll = useCallback(() => {
    onChange({
      posthog: 'accepted',
      googleAds: 'accepted',
    })
  }, [onChange])

  return {
    state,
    bannerDisplayState,
    setBannerDisplayState,
    onChange,
    rejectAll,
    acceptAll,
  }
}
