/**
 * This component is used to track split testing data, page views, locale, and region.
 * It needs to be inside UserProvider (because of useTrackRegion).
 * That's why those hooks are in their own component.
 */
'use client'

import { useTrackLocale } from '@/hooks/tracking/useTrackLocale'
import { useTrackPageView } from '@/hooks/tracking/useTrackPageView'
import { useTrackRegion } from '@/hooks/tracking/useTrackRegion'
import { useTrackSplitTesting } from '@/hooks/tracking/useTrackSplitTesting'
import { useFixedRegion } from '@/hooks/useFixedRegion'
import { useInitSimulationParam } from '@/hooks/useInitSimulationParam'
import { useRedirectIfInAppBrowser } from '@/hooks/useRedirectIfInAppBrowser'
import { useUserInfosParams } from '@/hooks/useUserInfosParams'
import { PropsWithChildren } from 'react'

export default function MainHooks({ children }: PropsWithChildren) {
  useTrackSplitTesting()
  useTrackPageView()
  useTrackLocale()
  useTrackRegion()
  useFixedRegion()
  useUserInfosParams()
  useInitSimulationParam()

  const { isInApp } = useRedirectIfInAppBrowser()

  return (
    <>
      {isInApp && (
        <div>
          In App Browser detected{' '}
          <ul>
            <li>
              <a href="https://nosgestesclimat.fr" target="_system">
                Link 1
              </a>
            </li>
            <li>
              <button
                onClick={() =>
                  window.open(
                    'https://nosgestesclimat.fr',
                    '_system',
                    'location=yes'
                  )
                }>
                Link 2
              </button>
            </li>
            <li>
              <a
                href="googlechrome://navigate?url=https://nosgestesclimat.fr"
                target="_system">
                Link 3
              </a>
            </li>
            <li>
              <button
                onClick={() =>
                  (window.location.href =
                    'intent:https://www.nosgestesclimat.fr/#Intent;end')
                }>
                Link 4
              </button>
            </li>
          </ul>
        </div>
      )}
      {children}
    </>
  )
}
