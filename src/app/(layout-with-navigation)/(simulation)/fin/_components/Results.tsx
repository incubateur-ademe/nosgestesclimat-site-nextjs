'use client'

import Link from '@/components/Link'
import Trans from '@/components/translation/Trans'
import Button from '@/design-system/inputs/Button'
import Separator from '@/design-system/layout/Separator'
import Emoji from '@/design-system/utils/Emoji'
import { useEngine, useSimulation } from '@/publicodes-state'
import { useMemo } from 'react'
import CategoriesAccordion from './results/CategoriesAccordion'
import CategoriesChart from './results/CategoriesChart'
import TotalCard from './results/TotalCard'

export default function Results() {
  const { categories } = useSimulation()
  const { getNumericValue } = useEngine()

  const sortedCategories = useMemo(() => {
    return categories.sort((categoryA, categoryB) => {
      const valueA = getNumericValue(categoryA) ?? 0
      const valueB = getNumericValue(categoryB) ?? 0

      return valueB - valueA
    })
  }, [categories, getNumericValue])

  function handleScrollToEmailBlock() {
    const emailBlock = document.getElementById('email-block')

    if (emailBlock) {
      emailBlock.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="mb-0 text-lg">
          <Trans>Votre bilan</Trans>
        </h2>

        <Button
          color="text"
          className="text-base underline"
          onClick={handleScrollToEmailBlock}>
          <Emoji className="mr-2 inline-block">📩</Emoji>
          <Trans>Sauvegarder</Trans>
        </Button>
      </div>

      <div className="flex flex-col items-stretch justify-center md:flex-row md:gap-4">
        <TotalCard />

        <CategoriesChart sortedCategories={sortedCategories} />
      </div>

      <CategoriesAccordion sortedCategories={sortedCategories} />

      <div className="mt-2 text-right">
        <Link href="/profil#answers" className="text-sm md:mt-4">
          <Trans>Modifier mes réponses</Trans>
        </Link>
      </div>

      <Separator />
    </>
  )
}
