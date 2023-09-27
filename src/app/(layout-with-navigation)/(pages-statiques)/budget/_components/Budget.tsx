'use client'

import { getLocalisedMDX } from '@/helpers/getLocalisedMDX'
import { useLocale } from '@/hooks/useLocale'
import contentEnBottom from '@/locales/pages/en-us/budgetBottom.mdx'
import contentEnTop from '@/locales/pages/en-us/budgetTop.mdx'
import contentFrBottom from '@/locales/pages/fr/budgetBottom.mdx'
import contentFrTop from '@/locales/pages/fr/budgetTop.mdx'
import SelectYear from './SelectYear'

export default function Budget() {
  const locale = useLocale()

  const BudgetContentTop = getLocalisedMDX({
    dictionnaries: {
      fr: contentFrTop,
      'en-US': contentEnTop,
    },
    locale: locale ?? '',
  })

  const BudgetContentBottom = getLocalisedMDX({
    dictionnaries: {
      fr: contentFrBottom,
      'en-US': contentEnBottom,
    },
    locale: locale ?? '',
  })

  return (
    <>
      <BudgetContentTop />
      <SelectYear />
      <BudgetContentBottom />
    </>
  )
}
