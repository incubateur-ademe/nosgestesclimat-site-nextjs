import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import Guide from './_components/Guide'

export function generateMetadata() {
  return getMetadataObject({
    title: 'Le guide - Nos Gestes Climat',
    description:
      'Retrouvez dans ce guide toutes les informations sur Nos Gestes Climat.',
  })
}

export default function GuidePage() {
  return <Guide />
}
