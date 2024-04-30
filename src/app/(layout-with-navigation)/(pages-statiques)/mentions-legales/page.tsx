import MDXContent from '@/components/mdx/MDXContent'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import MentionsLegalesEn from '@/locales/pages/en/mentions-legales.mdx'
import MentionsLegalesEs from '@/locales/pages/es/mentions-legales.mdx'
import MentionsLegalesFr from '@/locales/pages/fr/mentions-legales.mdx'

export async function generateMetadata() {
  const { t } = await getServerTranslation()

  return getMetadataObject({
    title: t('Mentions légales - Nos Gestes Climat'),
    description: t('Mentions légales du site Nos Gestes Climat.'),
  })
}

export default function MentionsLegalesPage() {
  return (
    <div className="markdown">
      <MDXContent
        contentEn={MentionsLegalesEn}
        contentFr={MentionsLegalesFr}
        contentEs={MentionsLegalesEs}
      />
    </div>
  )
}
