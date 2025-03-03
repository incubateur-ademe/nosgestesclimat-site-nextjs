import MDXContent from '@/components/mdx/MDXContent'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import DiffuserEn from '@/locales/pages/en/diffuser.mdx'
import DiffuserEs from '@/locales/pages/es/diffuser.mdx'
import DiffuserFr from '@/locales/pages/fr/diffuser.mdx'
import type { DefaultPageProps } from '@/types'

export async function generateMetadata({ params }: DefaultPageProps) {
  const { locale } = await params
  const { t } = await getServerTranslation({ locale })

  return getMetadataObject({
    locale,
    title: t(
      "Diffuser notre calculateur d'empreinte climat - Nos Gestes Climat"
    ),
    description: t('Diffusez Nos Gestes Climat dans votre organisation.'),
    alternates: {
      canonical: '/diffuser',
    },
  })
}

export default async function DiffuserPage({ params }: DefaultPageProps) {
  const { locale } = await params

  return (
    <MDXContent
      locale={locale}
      contentEn={DiffuserEn}
      contentFr={DiffuserFr}
      contentEs={DiffuserEs}
    />
  )
}
