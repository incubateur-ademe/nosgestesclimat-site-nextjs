import ToastDisplay from '@/components/messages/ToastDisplay'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { PropsWithChildren } from 'react'

export async function generateMetadata({
  params,
}: {
  params: { orgaSlug: string }
}) {
  const { t } = await getServerTranslation()

  return getMetadataObject({
    title: t('Organisations, mon espace - Nos Gestes Climat'),
    description: t(
      'Accédez à des services sur mesure pour sensibiliser vos partenaires au sein de votre organisation.'
    ),
    alternates: {
      canonical: `/organisations/${params.orgaSlug}/parametres`,
    },
  })
}

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      {children}
      <ToastDisplay />
    </>
  )
}
