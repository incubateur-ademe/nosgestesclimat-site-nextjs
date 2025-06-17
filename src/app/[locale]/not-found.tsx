import Route404 from '@/components/layout/404'
import Main from '@/design-system/layout/Main'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import i18nConfig from '@/i18nConfig'
import type { DefaultPageProps } from '@/types'

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
      canonical: '/404',
    },
  })
}

export default async function NotFound({ params }: DefaultPageProps) {
  const { locale } = (await params) ?? {}

  return (
    <Main>
      <Route404 locale={locale ?? i18nConfig.defaultLocale} />
    </Main>
  )
}
