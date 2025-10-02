import Route404 from '@/components/layout/404'
import Footer from '@/components/layout/Footer'
import { NOT_FOUND_PATH } from '@/constants/urls/paths'
import Main from '@/design-system/layout/Main'
import { t } from '@/helpers/metadata/fakeMetadataT'
import { getCommonMetadata } from '@/helpers/metadata/getCommonMetadata'
import type { DefaultPageProps } from '@/types'
import { ClientLayout } from '../../../components/layout/ClientLayout'

export const generateMetadata = getCommonMetadata({
  title: t('404 - Nos Gestes Climat'),
  description: t(
    "Oups, vous êtes bien sur Nos Gestes Climat, mais cette page n'existe pas."
  ),
  alternates: {
    canonical: NOT_FOUND_PATH,
  },
})

export default async function NotFoundCatchAll({ params }: DefaultPageProps) {
  const { locale } = (await params) ?? {}
  return (
    <ClientLayout locale={locale}>
      <Main>
        <Route404 locale={locale} />
      </Main>
      <Footer />
    </ClientLayout>
  )
}
