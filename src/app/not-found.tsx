import Route404 from '@/components/layout/404'
import { ClientLayout } from '@/components/layout/ClientLayout'
import { noIndexObject } from '@/constants/metadata'
import Main from '@/design-system/layout/Main'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import i18nConfig, { type Locale } from '@/i18nConfig'
import { Suspense } from 'react'
import './[locale]/globals.css'
import { marianne } from './[locale]/layout'

export function generateMetadata() {
  return getMetadataObject({
    locale: i18nConfig.defaultLocale,
    title: '404 - Nos Gestes Climat',
    description:
      "Oups, vous êtes bien sur Nos Gestes Climat, mais cette page n'existe pas.",
    robots: noIndexObject,
  })
}

export default function NotFound() {
  return (
    <Suspense fallback={<div>Chargement de la page...</div>}>
      <ClientLayout locale={i18nConfig.defaultLocale as Locale}>
        <Main className={marianne.className}>
          <Route404 locale={i18nConfig.defaultLocale as Locale} />
        </Main>
      </ClientLayout>
    </Suspense>
  )
}
