import Route404 from '@/components/layout/404'
import { t } from '@/helpers/metadata/fakeMetadataT'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: t('404 - Nos Gestes Climat'),
  description: t(
    "Oups, vous êtes bien sur Nos Gestes Climat, mais cette page n'existe pas."
  ),
  alternates: {
    canonical: '/404',
  },
}

export default function NotFound() {
  return <Route404 />
}
