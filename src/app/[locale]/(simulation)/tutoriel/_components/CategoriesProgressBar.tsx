'use client'

import Badge from '@/design-system/layout/Badge'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { twMerge } from 'tailwind-merge'

const CATEGORIES = ['transport', 'alimentation', 'logement', 'divers'] as const

type Category = (typeof CATEGORIES)[number]

interface CategoriesProgressBarProps {
  className?: string
  currentCategory?: Category
}

export default function CategoriesProgressBar({
  className,
}: CategoriesProgressBarProps) {
  const { t } = useClientTranslation()

  const categoryLabels = {
    transport: t('Transport'),
    alimentation: t('Alimentation'),
    logement: t('Logement'),
    divers: t('Divers'),
  }

  return (
    <div
      className={twMerge('mb-10 flex items-center justify-center', className)}>
      <div className="flex items-center">
        {CATEGORIES.map((category, index) => (
          <div key={category} className="flex items-center">
            <Badge className="bg-primary-100 rounded-full border-none px-6 py-3 text-sm font-bold">
              {categoryLabels[category]}
            </Badge>
            {index < CATEGORIES.length - 1 && (
              <div className="bg-primary-100 h-0.5 w-8" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
