/**
 * This component is used to track split testing data, page views, locale, and region.
 * It needs to be inside UserProvider (because of useTrackRegion).
 * That's why those hooks are in their own component.
 */
'use client'

import { useTrackIframe } from '@/hooks/tracking/useTrackIframe'
import { useTrackRegion } from '@/hooks/tracking/useTrackRegion'
import { useFixedRegion } from '@/hooks/useFixedRegion'
import { useInitSimulationParam } from '@/hooks/useInitSimulationParam'
import { useRedirectIfInAppBrowser } from '@/hooks/useRedirectIfInAppBrowser'
import { useUserInfosParams } from '@/hooks/useUserInfosParams'
import { getIsIframe } from '@/utils/getIsIframe'

export default function MainHooks() {
  useTrackRegion()
  useFixedRegion()
  useUserInfosParams()
  useInitSimulationParam()
  useRedirectIfInAppBrowser()
  useTrackIframe(getIsIframe())

  return null
}
