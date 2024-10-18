'use client'

import isMobile from 'is-mobile'
import { useEffect, useState } from 'react'
import DesktopCircles from './DesktopCircles'

export default function TempCircles() {
  const [shouldDisplay, setShouldDisplay] = useState(false)

  useEffect(() => {
    if (!isMobile()) {
      setShouldDisplay(true)
    }
  }, [])

  if (!shouldDisplay) {
    return null
  }

  return <DesktopCircles />
}
