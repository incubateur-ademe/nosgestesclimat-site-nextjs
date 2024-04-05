import MDXContent from '@/components/mdx/MDXContent'
import { t } from '@/helpers/metadata/fakeMetadataT'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import MentionsLegalesEn from '@/locales/pages/en/mentions-legales.mdx'
import MentionsLegaleFr from '@/locales/pages/fr/mentions-legales.mdx'

export async function generateMetadata() {
  return getMetadataObject({
    title: t('Mentions légales - Nos Gestes Climat'),
    description: t('Mentions légales du site Nos Gestes Climat.'),
  })
}

export default function MentionsLegalesPage() {
  return (
    <div className="markdown">
      <MDXContent contentEn={MentionsLegalesEn} contentFr={MentionsLegaleFr} />
    </div>
  )
}
