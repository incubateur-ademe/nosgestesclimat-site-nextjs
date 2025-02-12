import MDXContent from '@/components/mdx/MDXContent'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import AboutEn from '@/locales/pages/en/empreinte-climat.mdx'
import AboutEs from '@/locales/pages/es/empreinte-climat.mdx'
import AboutFr from '@/locales/pages/fr/empreinte-climat.mdx'

export async function generateMetadata() {
  const { t } = await getServerTranslation()

  return getMetadataObject({
    title: t('Empreinte Climat - Nos Gestes Climat'),
    description: t(`L'empreinte climat, qu'est-ce que c'est ?`),
    alternates: {
      canonical: '/empreinte-climat',
    },
  })
}

export default function AProposPage() {
  return (
    <MDXContent contentEn={AboutEn} contentFr={AboutFr} contentEs={AboutEs} />
  )
}
