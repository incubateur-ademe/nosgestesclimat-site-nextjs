import MDXContent from '@/components/mdx/MDXContent'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import contentEnBottom from '@/locales/pages/en/budgetBottom.mdx'
import contentEnTop from '@/locales/pages/en/budgetTop.mdx'
import contentFrBottom from '@/locales/pages/fr/budgetBottom.mdx'
import contentFrTop from '@/locales/pages/fr/budgetTop.mdx'
import SelectYear from './_components/SelectYear'

export async function generateMetadata() {
  return getMetadataObject({
    title: 'Budget - Nos Gestes Climat',
    description: 'Informations relatives au budget de Nos Gestes Climat.',
    alternates: {
      canonical: '/budget',
    },
  })
}

export default function BudgetPage() {
  return (
    <>
      <MDXContent contentEn={contentEnTop} contentFr={contentFrTop} />
      <SelectYear />
      <MDXContent contentEn={contentEnBottom} contentFr={contentFrBottom} />
    </>
  )
}
