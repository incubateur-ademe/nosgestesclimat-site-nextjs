/**
 * This component is used to track split testing data, page views, locale, and region.
 * It needs to be inside UserProvider (because of useTrackRegion).
 * That's why those hooks are in their own component.
 */
'use client'

import { useSetCurrentSimulationFromParams } from '@/hooks/simulation/useSetCurrentSimulationFromParams'
import { useTrackRegion } from '@/hooks/tracking/useTrackRegion'
import { useFixedRegion } from '@/hooks/useFixedRegion'
import { useInitSimulationParam } from '@/hooks/useInitSimulationParam'
import { useRedirectIfInAppBrowser } from '@/hooks/useRedirectIfInAppBrowser'
import { useUserInfosParams } from '@/hooks/useUserInfosParams'
import type { PropsWithChildren } from 'react'

export default function MainHooks({ children }: PropsWithChildren) {
  useSetCurrentSimulationFromParams()
  useTrackRegion()
  useFixedRegion()
  useUserInfosParams()
  useInitSimulationParam()
  useRedirectIfInAppBrowser()

  return children
}
