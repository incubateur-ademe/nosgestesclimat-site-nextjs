import Route404 from '@/components/layout/404'
import { ClientLayout } from '@/components/layout/ClientLayout'
import { noIndexObject } from '@/constants/metadata'
import Main from '@/design-system/layout/Main'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import i18nConfig from '@/i18nConfig'
import './[locale]/globals.css'

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
    <ClientLayout locale={i18nConfig.defaultLocale}>
      <Main>
        <Route404 locale={i18nConfig.defaultLocale} />
      </Main>
    </ClientLayout>
  )
}
