'use client'

import { useClientTranslation } from '@/hooks/useClientTranslation'
import { DottedName } from '@incubateur-ademe/nosgestesclimat'
import Image from 'next/image'
import { useMemo } from 'react'
import { twMerge } from 'tailwind-merge'

export default function CategoryIllustration({
  category,
}: {
  category: DottedName
}) {
  const { t } = useClientTranslation()

  const categoryProps = useMemo(() => {
    switch (category) {
      case 'transport':
        return {
          src: '/images/illustrations/mother-and-son-on-bike.svg',
          alt: t('Une mère et son enfant sur un vélo'),
          className: 'min-w-[500px] md:min-w-0 left-0 md:right-0',
        }
      case 'alimentation':
        return {
          src: '/images/illustrations/girl-cooking.svg',
          alt: t('Une fille qui cuisine'),
          className: 'min-w-[400px] md:min-w-0 left-0 md:-right-10',
        }
      case 'logement':
        return {
          src: '/images/illustrations/girl-reading-newspaper.svg',
          alt: t('Une fille qui lit un journal'),
          className:
            'min-w-[600px] md:min-w-0 -left-10 md:-right-10 md:max-w-[300px]',
        }
      case 'divers':
        return {
          src: '/images/illustrations/at-the-cinema.svg',
          alt: t('Un grand-père et sa petite fille qui regardent un film'),
          className: 'min-w-[400px] md:min-w-0 left-0 md:-right-10',
        }
      case 'services sociétaux':
        return {
          src: '/images/illustrations/children-holding-hand.svg',
          alt: t('Des enfants qui se tiennent la main'),
          className:
            'min-w-[400px] -left-6 md:min-w-0 md:-right-10 md:top-auto',
        }
      default:
        return null
    }
  }, [category, t])

  if (!categoryProps) {
    return null
  }

  return (
    <Image
      src={categoryProps.src}
      alt={categoryProps.alt}
      width={300}
      height={500}
      className={twMerge(
        'absolute -left-20 top-20 -z-10 block opacity-10 md:static md:left-auto md:top-auto md:mx-auto md:max-w-[240px] md:opacity-100',
        categoryProps.className ?? ''
      )}
    />
  )
}
