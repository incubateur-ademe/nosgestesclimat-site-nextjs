'use client'

import HideInIframe from '@/components/layout/HideInIframe'
import BottomBannerWithCTA from '@/design-system/layout/BottomBannerWithCTA'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

/**
 * Height of the bottom banner (`min-h-20`): the inline CTA only counts as
 * visible once it clears the banner, so the hand-over between the two is
 * seamless.
 */
const BANNER_HEIGHT = 80

interface Props {
  /** The CTA in the page flow */
  children: React.ReactNode
  /** The same CTA, pinned to the bottom of the screen */
  stickyCta: React.ReactNode
}

/**
 * Pins `stickyCta` to the bottom of the screen on mobile for as long as the
 * inline CTA is below the fold. It goes away as soon as the inline CTA shows
 * up, and stays away once the user has scrolled past it.
 */
export default function MobileStickyCta({ children, stickyCta }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [isBelowFold, setIsBelowFold] = useState(false)

  // Read on scroll rather than with an IntersectionObserver: a jump back to the
  // top (iOS status bar tap, anchor) never crosses the inline CTA, so an
  // observer would not notice that it is below the fold again.
  useEffect(() => {
    const element = ref.current
    if (!element) return

    let frame = 0
    const update = () => {
      frame = 0
      setIsBelowFold(
        element.getBoundingClientRect().top > window.innerHeight - BANNER_HEIGHT
      )
    }
    const scheduleUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
    }
  }, [])

  return (
    <>
      <div ref={ref} className="w-full">
        {children}
      </div>

      {/* Portaled: an ancestor's transform (e.g. the card's entrance
          animation) would otherwise pin the banner to it, not the viewport.
          `isBelowFold` is only set after mount, so `document` is defined. */}
      {isBelowFold &&
        createPortal(
          <HideInIframe>
            <BottomBannerWithCTA className="md:hidden">
              {stickyCta}
            </BottomBannerWithCTA>
          </HideInIframe>,
          document.body
        )}
    </>
  )
}
