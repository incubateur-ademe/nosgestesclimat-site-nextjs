import MDXContent from '@/components/mdx/MDXContent'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import contentEnBottom from '@/locales/pages/en/budgetBottom.mdx'
import contentEnTop from '@/locales/pages/en/budgetTop.mdx'
import contentEsBottom from '@/locales/pages/es/budgetBottom.mdx'
import contentEsTop from '@/locales/pages/es/budgetTop.mdx'
import contentFrBottom from '@/locales/pages/fr/budgetBottom.mdx'
import contentFrTop from '@/locales/pages/fr/budgetTop.mdx'
import SelectYear from './_components/SelectYear'

export async function generateMetadata() {
  const { t } = await getServerTranslation()
  return getMetadataObject({
    title: t('Budget - Nos Gestes Climat'),
    description: t('Informations relatives au budget de Nos Gestes Climat.'),
    alternates: {
      canonical: '/budget',
    },
  })
}

export default function BudgetPage() {
  return (
    <>
      <MDXContent
        contentEn={contentEnTop}
        contentFr={contentFrTop}
        contentEs={contentEsTop}
      />
      <SelectYear />
      <MDXContent
        contentEn={contentEnBottom}
        contentFr={contentFrBottom}
        contentEs={contentEsBottom}
      />
    </>
  )
}
