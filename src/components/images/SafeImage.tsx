'use client'

import type { ImageProps } from 'next/image'
import Image from 'next/image'
import { useState } from 'react'

export default function SafeImage({ alt, src, ...props }: ImageProps) {
  const [isErrorLoading, setIsErrorLoading] = useState(false)

  if (isErrorLoading) return null

  return (
    <Image
      {...props}
      src={src}
      alt={alt ?? ''}
      onError={({ currentTarget }) => {
        currentTarget.onerror = null
        setIsErrorLoading(true)
      }}
      crossOrigin="anonymous"
    />
  )
}
