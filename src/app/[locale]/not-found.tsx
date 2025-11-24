import Route404 from '@/components/layout/404'
import { ClientLayout } from '@/components/layout/ClientLayout'
import { noIndexObject } from '@/constants/metadata'
import Main from '@/design-system/layout/Main'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import i18nConfig from '@/i18nConfig'
import type { DefaultPageProps } from '@/types'
import { Suspense } from 'react'
import './globals.css'
import { marianne } from './layout'

export async function generateMetadata(props: DefaultPageProps) {
  const { locale } = await props.params
  const { t } = await getServerTranslation({ locale })

  return getMetadataObject({
    locale,
    title: t('404 - Nos Gestes Climat'),
    description: t(
      "Oups, vous êtes bien sur Nos Gestes Climat, mais cette page n'existe pas."
    ),
    robots: noIndexObject,
  })
}

export default async function NotFound({ params }: DefaultPageProps) {
  const { locale } = (await params) ?? {}

  return (
    <Suspense fallback={<div>Chargement de la page...</div>}>
      <ClientLayout locale={locale ?? i18nConfig.defaultLocale}>
        <Main className={marianne.className}>
          <Route404 locale={locale ?? i18nConfig.defaultLocale} />
        </Main>
      </ClientLayout>
    </Suspense>
  )
}
