import MDXContent from '@/components/mdx/MDXContent'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import ContentEn from '@/locales/pages/en/CGU.mdx'
import ContentEs from '@/locales/pages/es/CGU.mdx'
import ContentFr from '@/locales/pages/fr/CGU.mdx'

export async function generateMetadata() {
  const { t } = await getServerTranslation()
  return getMetadataObject({
    title: t('CGU - Nos Gestes Climat'),
    description: t("Conditions générales d'utilisation du site."),
    alternates: {
      canonical: '/cgu',
    },
  })
}

export default function CGUPage() {
  return (
    <MDXContent
      contentEn={ContentEn}
      contentFr={ContentFr}
      contentEs={ContentEs}
    />
  )
}
