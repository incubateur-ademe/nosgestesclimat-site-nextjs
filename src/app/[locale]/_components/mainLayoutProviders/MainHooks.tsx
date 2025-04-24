/**
 * This component is used to track split testing data, page views, locale, and region.
 * It needs to be inside UserProvider (because of useTrackRegion).
 * That's why those hooks are in their own component.
 */
'use client'

import { useSetIframeLang } from '@/hooks/language/useSetIframeLang'
import { usePartners } from '@/hooks/partners/usePartners'
import { useSetCurrentSimulationFromParams } from '@/hooks/simulation/useSetCurrentSimulationFromParams'
import { useTrackLocale } from '@/hooks/tracking/useTrackLocale'
import { useTrackPageView } from '@/hooks/tracking/useTrackPageView'
import { useTrackRegion } from '@/hooks/tracking/useTrackRegion'
import { useFixedRegion } from '@/hooks/useFixedRegion'
import { useInitSimulationParam } from '@/hooks/useInitSimulationParam'
import { useRedirectIfInAppBrowser } from '@/hooks/useRedirectIfInAppBrowser'
import { useUserInfosParams } from '@/hooks/useUserInfosParams'
import type { PropsWithChildren } from 'react'

export default function MainHooks({ children }: PropsWithChildren) {
  useSetCurrentSimulationFromParams()
  // We disable split testing tracking for now
  // useTrackSplitTesting()
  useTrackPageView()
  useTrackLocale()
  useTrackRegion()
  useFixedRegion()
  useUserInfosParams()
  useInitSimulationParam()
  useRedirectIfInAppBrowser()
  useSetIframeLang()

  return children
}
