import MDXContent from '@/components/mdx/MDXContent'
import { t } from '@/helpers/metadata/fakeMetadataT'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import GuideFr from '@/locales/guide-mode-groupe/fr/guide.mdx'

export async function generateMetadata() {
  return getMetadataObject({
    title: t('Le guide - Nos Gestes Climat'),
    description: t(
      'Retrouvez dans ce guide toutes les informations sur Nos Gestes Climat.'
    ),
    alternates: {
      canonical: '/guide',
    },
  })
}

export default function GuidePage() {
  return <MDXContent contentFr={GuideFr} />
}
