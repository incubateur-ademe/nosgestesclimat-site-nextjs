import Footer from '@/components/layout/Footer'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { PropsWithChildren } from 'react'

export async function generateMetadata() {
  return getMetadataObject({
    title: 'Pour les organisations - Nos Gestes Climat',
    description:
      'Accédez à des services sur mesure pour sensibiliser vos partenaires au sein de votre organisation.',
    alternates: {
      canonical: '/',
    },
  })
}

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      {children}

      <Footer className="mt-16 bg-white" />
    </>
  )
}
