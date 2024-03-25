import PasserTestBanner from '@/components/layout/PasserTestBanner'
import MDXContent from '@/components/mdx/MDXContent'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import AboutEn from '@/locales/pages/en/about.mdx'
import AboutFr from '@/locales/pages/fr/about.mdx'

export async function generateMetadata() {
  return getMetadataObject({
    title: 'À propos - Nos Gestes Climat',
    description: 'Informations relatives à Nos Gestes Climat.',
    alternates: {
      canonical: '/a-propos',
    },
  })
}

export default function AProposPage() {
  return (
    <>
      <PasserTestBanner />

      <MDXContent contentEn={AboutEn} contentFr={AboutFr} />
    </>
  )
}
