'use client'

import { useState } from 'react'

type Props = {
  id: string
  titre: string
  src: string
  height?: string
}

export default function MetabaseIframe({
  id,
  titre,
  src,
  height = '450px',
}: Props) {
  const [isIFrameLoaded, setIsIFrameLoaded] = useState(false)

  return (
    <>
      {!isIFrameLoaded && <div>Chargement...</div>}

      <iframe
        id={id}
        title={titre}
        src={src}
        width="100%"
        // Fix it for mobile
        height={height}
        className="border-none"
        onLoad={() => setIsIFrameLoaded(true)}></iframe>
    </>
  )
}
