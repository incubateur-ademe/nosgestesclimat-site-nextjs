import { useUser } from '@/publicodes-state'

export function useTrackIframe() {
  const { user } = useUser()
  posthog.register({
    $referrer: customReferrer,
    $referring_domain: url.hostname,
  })
  posthog.register_for_session({
    iframe: true,
  })
}
