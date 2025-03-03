import MDXContent from '@/components/mdx/MDXContent'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import contentEnBottom from '@/locales/pages/en/budgetBottom.mdx'
import contentEnTop from '@/locales/pages/en/budgetTop.mdx'
import contentEsBottom from '@/locales/pages/es/budgetBottom.mdx'
import contentEsTop from '@/locales/pages/es/budgetTop.mdx'
import contentFrBottom from '@/locales/pages/fr/budgetBottom.mdx'
import contentFrTop from '@/locales/pages/fr/budgetTop.mdx'
import type { DefaultPageProps } from '@/types'
import SelectYear from './_components/SelectYear'

export async function generateMetadata({ params }: DefaultPageProps) {
  const { locale } = await params
  const { t } = await getServerTranslation(locale)
  return getMetadataObject({
    locale,
    title: t('Budget - Nos Gestes Climat'),
    description: t('Informations relatives au budget de Nos Gestes Climat.'),
    alternates: {
      canonical: '/budget',
    },
  })
}

export default async function BudgetPage({ params }: DefaultPageProps) {
  const { locale } = await params

  return (
    <>
      <MDXContent
        contentEn={contentEnTop}
        contentFr={contentFrTop}
        contentEs={contentEsTop}
        locale={locale}
      />
      <SelectYear />
      <MDXContent
        contentEn={contentEnBottom}
        contentFr={contentFrBottom}
        contentEs={contentEsBottom}
        locale={locale}
      />
    </>
  )
}
