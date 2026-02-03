import { safeLocalStorage } from '@/utils/browser/safeLocalStorage'
import posthog from 'posthog-js'
import { useCallback } from 'react'
import { COOKIE_STATE_KEY, useCookieBanner } from './CookieBannerProvider'

export interface CookieState {
  posthog: 'accepted' | 'refused' | 'do_not_track'
  googleTag: 'accepted' | 'refused'
}

type CookieBannerDisplayState = 'hidden' | 'banner' | 'form'

const getCookieLocalStorageState = () => {
  const json = safeLocalStorage.getItem(COOKIE_STATE_KEY)

  const cookieLocalStorageState: CookieState = json
    ? (JSON.parse(json) as CookieState)
    : ({
        posthog: 'refused',
        googleTag: 'refused',
      } as const)

  return { cookieLocalStorageState, cookieStateJson: json }
}

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
  cookieState: CookieState
  cookieStateJson: string | null
  onChange: (state: CookieState) => void
  cookieBannerDisplayState: CookieBannerDisplayState
  setCookieBannerDisplayState: (state: CookieBannerDisplayState) => void
  rejectAll: () => void
  acceptAll: () => void
} {
  const { cookieBannerDisplayState, setCookieBannerDisplayState } =
    useCookieBanner()

  const { cookieLocalStorageState, cookieStateJson } =
    getCookieLocalStorageState()

  const handleUpdatePosthog = useCallback((cookieState: CookieState) => {
    switch (cookieState.posthog) {
      case 'accepted':
        posthog.opt_in_capturing()
        break
      case 'refused':
        posthog.opt_out_capturing()
        break
      case 'do_not_track':
        posthog.set_config({
          disable_persistence: true,
          disable_session_recording: true,
          opt_out_capturing_by_default: true,
        })
        posthog.opt_out_capturing()
        break
    }
  }, [])

  const handleUpdateGoogleTag = useCallback((cookieState: CookieState) => {
    switch (cookieState.googleTag) {
      case 'accepted':
        window.gtag?.('consent', 'update', {
          ad_storage: 'granted',
          ad_user_data: 'granted',
          ad_personalization: 'granted',
        })
        break
      case 'refused':
        window.gtag?.('consent', 'update', {
          ad_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied',
        })
        break
    }
  }, [])

  const onChange = useCallback(
    (cookieState: CookieState) => {
      setCookieBannerDisplayState('hidden')

      handleUpdatePosthog(cookieState)

      handleUpdateGoogleTag(cookieState)

      safeLocalStorage.setItem(COOKIE_STATE_KEY, JSON.stringify(cookieState))
    },
    [handleUpdateGoogleTag, handleUpdatePosthog, setCookieBannerDisplayState]
  )

  const rejectAll = useCallback(() => {
    onChange({
      posthog: 'refused',
      googleTag: 'refused',
    })
  }, [onChange])

  const acceptAll = useCallback(() => {
    onChange({
      posthog: 'accepted',
      googleTag: 'accepted',
    })
  }, [onChange])

  return {
    cookieState: cookieLocalStorageState,
    cookieStateJson,
    cookieBannerDisplayState,
    setCookieBannerDisplayState,
    onChange,
    rejectAll,
    acceptAll,
  }
}
