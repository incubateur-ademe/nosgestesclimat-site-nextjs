import MDXContent from '@/components/mdx/MDXContent'
import { t } from '@/helpers/metadata/fakeMetadataT'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import DiffuserEn from '@/locales/pages/en/diffuser.mdx'
import DiffuserFr from '@/locales/pages/fr/diffuser.mdx'

export async function generateMetadata() {
  return getMetadataObject({
    title: t(
      "Diffuser notre simulateur d'empreinte climat - Nos Gestes Climat"
    ),
    description: t('Diffusez Nos Gestes Climat dans votre organisation.'),
    alternates: {
      canonical: '/diffuser',
    },
  })
}

export default function DiffuserPage() {
  return <MDXContent contentEn={DiffuserEn} contentFr={DiffuserFr} />
}
