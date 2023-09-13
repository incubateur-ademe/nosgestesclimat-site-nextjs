'use client'

import Loader from '@/design-system/layout/Loader'

import Title from '@/design-system/layout/Title'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function NorthStarPage() {
  const { t } = useTranslation()
  const title = t('Statistiques Northstar')

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
    <div className={'ui__ fluid container'}>
      <Title title={title} />

      <p>
        {t(
          'Le chargement prend parfois plusieurs minutes, visualiser ce dashboard demande un peu de patience ! 🕙'
        )}
      </p>
      {!isIFrameLoaded && <Loader />}
      <iframe
        ref={iFrameRef}
        id="iframe-metabase-northstar"
        title="Statistiques Northstar Metabase"
        src="https://metabase-ngc.osc-fr1.scalingo.io/public/dashboard/0f6974c5-1254-47b4-b6d9-6e6f22a6faf7"
        width="100%"
        height="1800px"
        className="border-none"></iframe>
    </div>
  )
}
