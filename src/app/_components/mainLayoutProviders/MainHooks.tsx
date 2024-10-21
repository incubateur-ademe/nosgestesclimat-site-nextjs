/**
 * This component is used to track split testing data, page views, locale, and region.
 * It needs to be inside UserProvider (because of useTrackRegion).
 * That's why those hooks are in their own component.
 */
'use client'

import { useSetCurrentSimulationFromParams } from '@/hooks/simulation/useSetCurrentSimulationFromParams'
import { useTrackLocale } from '@/hooks/tracking/useTrackLocale'
import { useTrackPageView } from '@/hooks/tracking/useTrackPageView'
import { useTrackRegion } from '@/hooks/tracking/useTrackRegion'
import { useTrackSplitTesting } from '@/hooks/tracking/useTrackSplitTesting'
import { useFixedRegion } from '@/hooks/useFixedRegion'
import { useInitSimulationParam } from '@/hooks/useInitSimulationParam'
import { useRedirectIfInAppBrowser } from '@/hooks/useRedirectIfInAppBrowser'
import { useUserInfosParams } from '@/hooks/useUserInfosParams'

export default function MainHooks() {
  useSetCurrentSimulationFromParams()
  useTrackSplitTesting()
  useTrackPageView()
  useTrackLocale()
  useTrackRegion()
  useFixedRegion()
  useUserInfosParams()
  useInitSimulationParam()
  useRedirectIfInAppBrowser()

  return null
}
