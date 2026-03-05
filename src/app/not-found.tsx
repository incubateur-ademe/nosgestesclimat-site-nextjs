import Route404 from '@/components/layout/404'
import { ClientLayout } from '@/components/layout/ClientLayout'
import ContentLarge from '@/components/layout/ContentLarge'
import HeaderServer from '@/components/layout/HeaderServer'
import { noIndexObject } from '@/constants/metadata'
import BlockSkeleton from '@/design-system/layout/BlockSkeleton'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import i18nConfig from '@/i18nConfig'
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
    <html lang="fr">
      <body className={`${marianne.className} text-default bg-white`}>
        <Suspense
          fallback={
            <>
              <HeaderServer locale={i18nConfig.defaultLocale} />
              <ContentLarge>
                <BlockSkeleton className="mt-10" />
              </ContentLarge>
            </>
          }>
          <ClientLayout locale={i18nConfig.defaultLocale}>
            <Route404 locale={i18nConfig.defaultLocale} />
          </ClientLayout>
        </Suspense>
      </body>
    </html>
  )
}
