'use client'

import MDXContent from '@/components/mdx/MDXContent'
import contentEnBottom from '@/locales/pages/en/budgetBottom.mdx'
import contentEnTop from '@/locales/pages/en/budgetTop.mdx'
import contentFrBottom from '@/locales/pages/fr/budgetBottom.mdx'
import contentFrTop from '@/locales/pages/fr/budgetTop.mdx'
import SelectYear from './SelectYear'

export default function Budget() {
  return (
    <>
      <MDXContent contentEn={contentEnTop} contentFr={contentFrTop} />
      <SelectYear />
      <MDXContent contentEn={contentEnBottom} contentFr={contentFrBottom} />
    </>
  )
}
