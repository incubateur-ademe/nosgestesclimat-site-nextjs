'use client'

import Link from '@/components/Link'
import CategoriesAccordion from '@/components/results/CategoriesAccordion'
import CategoriesChart from '@/components/results/CategoriesChart'
import Trans from '@/components/translation/Trans'
import Button from '@/design-system/inputs/Button'
import Separator from '@/design-system/layout/Separator'
import Title from '@/design-system/layout/Title'
import Emoji from '@/design-system/utils/Emoji'
import TotalCard from './results/TotalCard'

export default function Results() {
  function handleScrollToEmailBlock() {
    const emailBlock = document.getElementById('email-block')

    if (emailBlock) {
      emailBlock.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <Title
          className="mb-0 text-lg md:text-xl"
          title={<Trans>Votre bilan</Trans>}
        />

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

        <CategoriesChart />
      </div>

      <CategoriesAccordion />

      <div className="mt-2 text-right">
        <Link href="/profil#answers" className="text-sm md:mt-4">
          <Trans>Modifier mes réponses</Trans>
        </Link>
      </div>

      <Separator />
    </>
  )
}
