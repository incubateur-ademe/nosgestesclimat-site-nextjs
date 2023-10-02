'use client'

import { getLocalisedMDX } from '@/helpers/getLocalisedMDX'
import { useLocale } from '@/hooks/useLocale'
import contentEnBottom from '@/locales/pages/en/budgetBottom.mdx'
import contentEnTop from '@/locales/pages/en/budgetTop.mdx'
import contentFrBottom from '@/locales/pages/fr/budgetBottom.mdx'
import contentFrTop from '@/locales/pages/fr/budgetTop.mdx'
import SelectYear from './_components/SelectYear'

export default function Budget() {
  const locale = useLocale()

  const BudgetContentTop = getLocalisedMDX({
    dictionnaries: {
      fr: contentFrTop,
      en: contentEnTop,
    },
    locale: locale ?? '',
  })

  const BudgetContentBottom = getLocalisedMDX({
    dictionnaries: {
      fr: contentFrBottom,
      en: contentEnBottom,
    },
    locale: locale ?? '',
  })

  return (
    <>
      {/*
      <Meta
				title={t('meta.publicodes.Budget.title')}
				description={t('meta.publicodes.Budget.description')}
			/>
      */}

      <BudgetContentTop />
      <SelectYear />
      <BudgetContentBottom />
    </>
  )
}
