'use client'

import Loader from '@/design-system/layout/Loader'
import { useEffect, useRef, useState } from 'react'

export default function NorthStarIframe() {
  const iFrameRef = useRef(null)

  const [isIFrameLoaded, setIsIFrameLoaded] = useState(false)

  useEffect(() => {
    const iframeCurrent: any = iFrameRef.current

    iframeCurrent?.addEventListener('load', () => setIsIFrameLoaded(true))

    return () => {
      iframeCurrent?.removeEventListener('load', () => setIsIFrameLoaded(true))
    }
  }, [iFrameRef])
  return (
    <>
      {!isIFrameLoaded && <Loader />}

      <iframe
        ref={iFrameRef}
        id="iframe-metabase-northstar"
        title="Statistiques Northstar Metabase"
        src="https://metabase-ngc.osc-fr1.scalingo.io/public/dashboard/0f6974c5-1254-47b4-b6d9-6e6f22a6faf7"
        width="100%"
        height="1800px"
        className="border-none"></iframe>
    </>
  )
}
