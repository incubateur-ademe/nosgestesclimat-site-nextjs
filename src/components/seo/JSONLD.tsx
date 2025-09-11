'use client'

import { useEffect, useState } from 'react'

export default function JSONLD({
  jsonLd,
}: {
  jsonLd: Array<Record<string, any>>
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd),
      }}
    />
  )
}
