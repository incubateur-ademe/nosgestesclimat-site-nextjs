import Route404 from '@/components/layout/404'
import { t } from '@/helpers/metadata/fakeMetadataT'
import { getCommonMetadata } from '@/helpers/metadata/getCommonMetadata'
import type { DefaultPageProps } from '@/types'

export const generateMetadata = getCommonMetadata({
  title: t('404 - Nos Gestes Climat'),
  description: t(
    "Oups, vous êtes bien sur Nos Gestes Climat, mais cette page n'existe pas."
  ),
  alternates: {
    canonical: '/404',
  },
})

export default async function NotFoundCatchAll({ params }: DefaultPageProps) {
  const { locale } = (await params) ?? {}
  return (
    <Main>
      <Route404 locale={locale} />
    </Main>
  )
}
