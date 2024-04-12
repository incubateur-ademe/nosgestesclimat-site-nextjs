import PasserTestBanner from '@/components/layout/PasserTestBanner'
import MDXContent from '@/components/mdx/MDXContent'
import { t } from '@/helpers/metadata/fakeMetadataT'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import AboutEn from '@/locales/pages/en/about.mdx'
import AboutFr from '@/locales/pages/fr/about.mdx'

export async function generateMetadata() {
  return getMetadataObject({
    title: t('À propos - Nos Gestes Climat'),
    description: t('Informations relatives à Nos Gestes Climat.'),
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
