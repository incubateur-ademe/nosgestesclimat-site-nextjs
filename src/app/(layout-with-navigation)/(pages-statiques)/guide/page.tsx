import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import GuideContent from './_content/guide.mdx'

export async function generateMetadata() {
  return getMetadataObject({
    title: 'Le guide - Nos Gestes Climat',
    description:
      'Retrouvez dans ce guide toutes les informations sur Nos Gestes Climat.',
  })
}

export default function GuidePage() {
  return <GuideContent />
}
