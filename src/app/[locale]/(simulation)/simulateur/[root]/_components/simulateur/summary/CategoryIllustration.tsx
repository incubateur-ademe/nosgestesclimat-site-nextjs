'use client'

import { useClientTranslation } from '@/hooks/useClientTranslation'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
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
          src: 'https://nosgestesclimat-prod.s3.fr-par.scw.cloud/cms/mother_and_son_on_bike_7ac0a5beab.png',
          alt: t('Une mère et son enfant sur un vélo'),
          className: '',
        }
      case 'alimentation':
        return {
          src: 'https://nosgestesclimat-prod.s3.fr-par.scw.cloud/cms/girl_cooking_0ec332454e.png',
          alt: t('Une fille qui cuisine'),
          className: '',
        }
      case 'logement':
        return {
          src: 'https://nosgestesclimat-prod.s3.fr-par.scw.cloud/cms/girl_reading_newspaper_d9b25f4338.png',
          alt: t('Une fille qui lit un journal'),
          className: 'min-w-[200px]',
        }
      case 'divers':
        return {
          src: 'https://nosgestesclimat-prod.s3.fr-par.scw.cloud/cms/at_the_cinema_71132e6e6e.png',
          alt: t('Un grand-père et sa petite fille qui regardent un film'),
          className: '',
        }
      case 'services sociétaux':
        return {
          src: 'https://nosgestesclimat-prod.s3.fr-par.scw.cloud/cms/children_holding_hand_92205645da.png',
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
        'bottom-0 ml-auto block w-[160px] md:static md:top-auto md:left-auto md:mx-auto md:w-[240px] md:opacity-100',
        categoryProps.className ?? ''
      )}
    />
  )
}
