import Route404 from '@/components/layout/404'
import { ClientLayout } from '@/components/layout/ClientLayout'
import { NOT_FOUND_PATH } from '@/constants/urls/paths'
import Main from '@/design-system/layout/Main'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import i18nConfig from '@/i18nConfig'
import type { DefaultPageProps } from '@/types'
import { ClientLayout } from './_components/ClientLayout'

export async function generateMetadata(props: DefaultPageProps) {
  const { locale } = await props.params
  const { t } = await getServerTranslation({ locale })

  return getMetadataObject({
    locale,
    title: t('404 - Nos Gestes Climat'),
    description: t(
      "Oups, vous êtes bien sur Nos Gestes Climat, mais cette page n'existe pas."
    ),
    alternates: {
      canonical: NOT_FOUND_PATH,
    },
  })
}

export default async function NotFound({ params }: DefaultPageProps) {
  const { locale } = (await params) ?? {}

  return (
    <ClientLayout locale={locale ?? i18nConfig.defaultLocale}>
      <Main>
        <Route404 locale={locale ?? i18nConfig.defaultLocale} />
      </Main>
    </ClientLayout>
  )
}
