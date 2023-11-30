import MDXContent from '@/components/mdx/MDXContent'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import GuideFr from '@/locales/guide-mode-groupe/fr/guide.mdx'

export async function generateMetadata() {
  return getMetadataObject({
    title: 'Le guide - Nos Gestes Climat',
    description:
      'Retrouvez dans ce guide toutes les informations sur Nos Gestes Climat.',
    alternates: {
      canonical: '/guide',
    },
  })
}

export default function GuidePage() {
  return <MDXContent contentFr={GuideFr} />
}
