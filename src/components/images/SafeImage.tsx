'use client'

import { useClientTranslation } from '@/hooks/useClientTranslation'
import type { ImageProps } from 'next/image'
import Image from 'next/image'
import { useState } from 'react'

export default function SafeImage({ alt, src, ...props }: ImageProps) {
  const [isErrorLoading, setIsErrorLoading] = useState(false)
  const { t } = useClientTranslation()

  if (isErrorLoading) return null

  return (
    <Image
      {...props}
      src={src}
      alt={alt ?? t('safeImage.defaultAlt', 'Image sans description')}
      onError={({ currentTarget }) => {
        currentTarget.onerror = null
        setIsErrorLoading(true)
      }}
      crossOrigin="anonymous">
      {' '}
      <></>
    </Image>
  )
}
