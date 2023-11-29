import MDXContent from '@/components/mdx/MDXContent'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import AboutEn from '@/locales/pages/en/about.mdx'
import AboutFr from '@/locales/pages/fr/about.mdx'

export async function generateMetadata() {
  return getMetadataObject({
    title: 'Mentions légales - Nos Gestes Climat',
    description: 'Mentions légales du site Nos Gestes Climat.',
  })
}

export default function MentionsLegalesPage() {
  return <MDXContent contentEn={AboutEn} contentFr={AboutFr} />
}
