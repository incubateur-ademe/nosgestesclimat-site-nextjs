'use client'

import DefaultErrorMessage from '@/components/error/DefaultErrorMessage'
import Loader from '@/design-system/layout/Loader'
import { useEffect, useRef, useState } from 'react'

export default function NorthStarIframe() {
  const iFrameRef = useRef(null)
  const [isIFrameLoaded, setIsIFrameLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const iframeCurrent: any = iFrameRef.current

    const handleLoad = () => setIsIFrameLoaded(true)
    const handleError = () => {
      setHasError(true)
      setIsIFrameLoaded(true) // Pour ne pas bloquer l'interface
    }

    iframeCurrent?.addEventListener('load', handleLoad)
    iframeCurrent?.addEventListener('error', handleError)

    return () => {
      iframeCurrent?.removeEventListener('load', handleLoad)
      iframeCurrent?.removeEventListener('error', handleError)
    }
  }, [iFrameRef])

  return (
    <>
      {!isIFrameLoaded && <Loader />}

      {hasError && <DefaultErrorMessage />}

      <iframe
        ref={iFrameRef}
        id="iframe-metabase-northstar"
        title="Statistiques Northstar Metabase"
        src="https://metabase.nosgestesclimat.fr/public/dashboard/0f6974c5-1254-47b4-b6d9-6e6f22a6faf7"
        width="100%"
        height="1800px"
        className="border-none"></iframe>
    </>
  )
}
