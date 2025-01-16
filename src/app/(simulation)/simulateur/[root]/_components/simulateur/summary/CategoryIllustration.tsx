'use client'

import { useClientTranslation } from '@/hooks/useClientTranslation'
import type { DottedName } from '@abc-transitionbascarbone/near-modele'
import Image from 'next/image'
import { useMemo } from 'react'
import { twMerge } from 'tailwind-merge'

export default function CategoryIllustration({
  category,
  shouldHideIllustration,
}: {
  category: DottedName
  shouldHideIllustration?: boolean
}) {
  const { t } = useClientTranslation()

  const categoryProps = useMemo(() => {
    switch (category) {
      case 'transport':
        return {
          src: '/images/illustrations/mother-and-son-on-bike.png',
          alt: t('Une mère et son enfant sur un vélo'),
          className: '',
        }
      case 'alimentation':
        return {
          src: '/images/illustrations/girl-cooking.png',
          alt: t('Une fille qui cuisine'),
          className: '',
        }
      case 'logement':
        return {
          src: '/images/illustrations/girl-reading-newspaper.png',
          alt: t('Une fille qui lit un journal'),
          className: 'min-w-[200px]',
        }
      case 'divers':
        return {
          src: '/images/illustrations/at-the-cinema.png',
          alt: t('Un grand-père et sa petite fille qui regardent un film'),
          className: '',
        }
      case 'services sociétaux':
        return {
          src: '/images/illustrations/children-holding-hand.png',
          alt: t('Des enfants qui se tiennent la main'),
          className: '',
        }
      default:
        return null
    }
  }, [category, t])

  if (!categoryProps || shouldHideIllustration) {
    return null
  }

  return (
    <Image
      src={categoryProps.src}
      alt={categoryProps.alt}
      width={300}
      height={500}
      className={twMerge(
        'bottom-0 ml-auto block max-w-[140px] md:static md:left-auto md:top-auto md:mx-auto md:max-w-[240px] md:opacity-100',
        categoryProps.className ?? ''
      )}
    />
  )
}
